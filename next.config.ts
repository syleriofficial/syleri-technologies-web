import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
// Vercel injects its feedback toolbar into preview deployments only.
const isPreview = process.env.VERCEL_ENV === "preview";
const vercelLive = isPreview ? ["https://vercel.live"] : [];

/**
 * Content Security Policy.
 *
 * Every page is statically generated, so there is no per-request nonce:
 * inline scripts stay allowed because Next.js streams its page data as
 * inline scripts and the theme script must run before first paint. Everything
 * else is locked to this origin — no third-party scripts, styles, fonts,
 * frames or connections — and the page cannot be framed, re-based or used to
 * post forms elsewhere. Checkout and the live demo are ordinary links, which
 * CSP does not restrict.
 */
const csp = [
  ["default-src", "'self'"],
  ["script-src", "'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : []), ...vercelLive],
  ["style-src", "'self'", "'unsafe-inline'"],
  ["img-src", "'self'", "data:", "blob:", ...(isPreview ? ["https://vercel.live", "https://vercel.com"] : [])],
  ["font-src", "'self'", ...(isPreview ? ["https://vercel.live", "https://assets.vercel.com"] : [])],
  ["connect-src", "'self'", ...(isDev ? ["ws:"] : []), ...(isPreview ? ["https://vercel.live", "wss://ws-us3.pusher.com"] : [])],
  ["frame-src", ...(isPreview ? vercelLive : ["'none'"])],
  ["media-src", "'self'"],
  ["worker-src", "'self'", "blob:"],
  ["manifest-src", "'self'"],
  ["object-src", "'none'"],
  ["base-uri", "'self'"],
  ["form-action", "'self'"],
  ["frame-ancestors", "'none'"],
  ...(isDev ? [] : [["upgrade-insecure-requests"]]),
]
  .map((d) => d.join(" "))
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
