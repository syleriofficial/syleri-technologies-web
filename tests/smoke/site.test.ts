/**
 * Smoke tests against the production build (`npm run build` first).
 * Starts `next start` on a free port and checks the public contract of every
 * page: status, canonical URL, metadata, security headers, structured data,
 * SEO files and the no-public-email rule.
 */
import assert from "node:assert/strict";
import { spawn, type ChildProcess } from "node:child_process";
import { createServer } from "node:net";
import { after, before, describe, it } from "node:test";

const ORIGIN = "https://syleritechnologies.com";
const PAGES = [
  "/",
  "/products",
  "/products/stockline",
  "/company",
  "/developers",
  "/updates",
  "/updates/stockline-1-0-0",
  "/contact",
  "/privacy",
  "/terms",
];
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}/;

let server: ChildProcess;
let base = "";

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const s = createServer();
    s.listen(0, () => {
      const { port } = s.address() as { port: number };
      s.close(() => resolve(port));
    });
    s.on("error", reject);
  });
}

async function waitForServer(url: string, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`server did not start at ${url}`);
}

const attr = (html: string, re: RegExp) => html.match(re)?.[1] ?? null;

before(async () => {
  const port = await freePort();
  base = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port), "-H", "127.0.0.1"], {
    stdio: "ignore",
    env: { ...process.env, NODE_ENV: "production" },
  });
  await waitForServer(base);
});

after(() => {
  server?.kill();
});

describe("public pages", () => {
  const titles = new Map<string, string>();

  for (const path of PAGES) {
    it(`${path} is complete and safe`, async () => {
      const res = await fetch(base + path);
      assert.equal(res.status, 200);
      const html = await res.text();

      const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
      assert.equal(canonical, ORIGIN + (path === "/" ? "" : path), "canonical");
      assert.equal(attr(html, /<meta property="og:url" content="([^"]+)"/), canonical, "og:url");

      const title = attr(html, /<title>([^<]+)<\/title>/);
      assert.ok(title, "title");
      assert.ok(!titles.has(title!), `duplicate title with ${titles.get(title!)}`);
      titles.set(title!, path);

      const description = attr(html, /<meta name="description" content="([^"]+)"/);
      assert.ok(description && description.length >= 50 && description.length <= 160, `description length ${description?.length}`);
      assert.ok(attr(html, /<meta property="og:image" content="([^"]+)"/)?.startsWith(ORIGIN), "og:image");
      assert.equal(attr(html, /<meta name="twitter:card" content="([^"]+)"/), "summary_large_image");
      assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, "exactly one h1");

      for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        assert.doesNotThrow(() => JSON.parse(block[1]!), "valid JSON-LD");
      }
      assert.ok(!html.includes("mailto:"), "no mailto links");
      assert.ok(!EMAIL.test(html), "no email address in page source");
    });
  }
});

describe("headers", () => {
  it("sends a restrictive Content-Security-Policy and security headers", async () => {
    const res = await fetch(base + "/");
    const csp = res.headers.get("content-security-policy") ?? "";
    for (const directive of ["default-src 'self'", "object-src 'none'", "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'"]) {
      assert.ok(csp.includes(directive), `CSP has ${directive}`);
    }
    assert.ok(!csp.includes("'unsafe-eval'"), "no unsafe-eval in production");
    assert.equal(res.headers.get("x-frame-options"), "DENY");
    assert.equal(res.headers.get("x-content-type-options"), "nosniff");
    assert.equal(res.headers.get("cross-origin-opener-policy"), "same-origin");
    assert.match(res.headers.get("strict-transport-security") ?? "", /max-age=\d+/);
    assert.equal(res.headers.get("x-powered-by"), null);
  });
});

describe("SEO files and routes", () => {
  it("robots.txt allows crawling and points at the sitemap on the canonical host", async () => {
    const txt = await (await fetch(base + "/robots.txt")).text();
    assert.match(txt, /Allow: \//);
    assert.match(txt, new RegExp(`Sitemap: ${ORIGIN}/sitemap.xml`));
    assert.doesNotMatch(txt, /^Host:/m);
  });

  it("sitemap lists every public page on the canonical host", async () => {
    const xml = await (await fetch(base + "/sitemap.xml")).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    assert.deepEqual(new Set(locs), new Set(PAGES.map((p) => ORIGIN + (p === "/" ? "" : p))));
  });

  it("unknown URLs return 404", async () => {
    assert.equal((await fetch(base + "/no-such-page")).status, 404);
  });

  it("serves /favicon.ico", async () => {
    const res = await fetch(base + "/favicon.ico");
    assert.equal(res.status, 200);
  });
});

describe("Stockline", () => {
  it("prices, checkout link and structured data agree", async () => {
    const html = await (await fetch(base + "/products/stockline")).text();
    const product = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .flatMap((m) => [JSON.parse(m[1]!)].flat())
      .find((d) => d["@type"] === "Product");
    assert.ok(product, "Product JSON-LD");
    assert.equal(product.offers.price, "49.00");
    assert.equal(product.offers.priceCurrency, "USD");
    assert.ok(Array.isArray(product.image) && product.image.length > 0, "product image");
    assert.match(product.offers.url, /^https:\/\/syleri-technologies\.lemonsqueezy\.com\/checkout\/buy\//);
    assert.ok(html.includes(`href="${product.offers.url}"`), "checkout button uses the same URL");
    // React separates adjacent text nodes with an empty comment.
    assert.ok(html.replaceAll("<!-- -->", "").includes("Get Stockline — $49"), "button price");
    assert.match(html, /frontend starter kit/i, "frontend-only positioning");
    assert.match(html, /does not include a backend, database or payment processing/, "disclosure");
  });
});

describe("contact page", () => {
  it("renders the form with a non-autofillable honeypot and no destination address", async () => {
    const html = await (await fetch(base + "/contact")).text();
    for (const field of ["name", "email", "subject", "message"]) {
      assert.match(html, new RegExp(`<label[^>]*for="contact-${field}"`), `label for ${field}`);
    }
    assert.match(html, /name="hp_x7q2"/);
    assert.doesNotMatch(html, /name="company"/);
  });
});
