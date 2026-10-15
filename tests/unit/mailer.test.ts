import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { sendContactEmail } from "../../src/lib/contact/mailer.ts";

const submission = {
  name: "Asha <b>Rao</b>",
  email: "visitor@example.com",
  subject: "Licensing question",
  message: "Hello & thanks.\nSecond line.",
};

const ENV = {
  RESEND_API_KEY: "re_test_SECRET_VALUE",
  CONTACT_TO_EMAIL: "destination@example.test",
  CONTACT_FROM_EMAIL: "Syleri Technologies <contact@example.test>",
};

const realFetch = globalThis.fetch;
let calls: { url: string; init: RequestInit }[] = [];

function mockFetch(response: () => Response | Promise<Response>) {
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return response();
  }) as typeof fetch;
}

beforeEach(() => {
  calls = [];
  Object.assign(process.env, ENV);
});

afterEach(() => {
  globalThis.fetch = realFetch;
  for (const k of Object.keys(ENV)) delete process.env[k];
});

describe("sendContactEmail", () => {
  it("sends from CONTACT_FROM_EMAIL to CONTACT_TO_EMAIL with the visitor as reply-to", async () => {
    mockFetch(() => new Response(JSON.stringify({ id: "1" }), { status: 200 }));
    await sendContactEmail(submission);

    assert.equal(calls.length, 1);
    assert.equal(calls[0]!.url, "https://api.resend.com/emails");
    assert.equal((calls[0]!.init.headers as Record<string, string>).Authorization, `Bearer ${ENV.RESEND_API_KEY}`);
    const body = JSON.parse(String(calls[0]!.init.body));
    assert.equal(body.from, ENV.CONTACT_FROM_EMAIL);
    assert.deepEqual(body.to, [ENV.CONTACT_TO_EMAIL]);
    assert.equal(body.reply_to, submission.email);
    assert.equal(body.subject, "Syleri Technologies Contact — Licensing question");
    assert.match(body.text, /Name: Asha <b>Rao<\/b>/);
    assert.match(body.text, /Submitted: \d{4}-\d{2}-\d{2} \d{2}:\d{2} UTC/);
  });

  it("escapes visitor input in the HTML body", async () => {
    mockFetch(() => new Response("{}", { status: 200 }));
    await sendContactEmail(submission);
    const { html } = JSON.parse(String(calls[0]!.init.body));
    assert.ok(html.includes("Asha &lt;b&gt;Rao&lt;/b&gt;"));
    assert.ok(html.includes("Hello &amp; thanks."));
    assert.ok(!html.includes("<b>Rao</b>"));
  });

  it("fails without leaking configuration values when a variable is missing", async () => {
    delete process.env.CONTACT_TO_EMAIL;
    mockFetch(() => new Response("{}", { status: 200 }));
    await assert.rejects(sendContactEmail(submission), (err: Error) => {
      assert.match(err.message, /CONTACT_TO_EMAIL/);
      assert.ok(!err.message.includes(ENV.RESEND_API_KEY));
      return true;
    });
    assert.equal(calls.length, 0);
  });

  it("drops provider error messages, which can echo addresses", async () => {
    mockFetch(
      () =>
        new Response(JSON.stringify({ statusCode: 403, name: "validation_error", message: "Domain not verified: destination@example.test" }), {
          status: 403,
        }),
    );
    await assert.rejects(sendContactEmail(submission), (err: Error) => {
      assert.equal(err.message, "Contact mailer responded with 403 (validation_error)");
      assert.ok(!err.message.includes("@"));
      return true;
    });
  });

  it("reports network failures generically", async () => {
    mockFetch(() => {
      throw new TypeError("getaddrinfo ENOTFOUND api.resend.com destination@example.test");
    });
    await assert.rejects(sendContactEmail(submission), (err: Error) => {
      assert.equal(err.message, "Contact mailer request failed (network error)");
      return true;
    });
  });
});
