import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { clientIpFromHeaders, positiveIntSetting } from "../../src/lib/contact/client-ip.ts";

const from = (h: Record<string, string>) => (name: string) => h[name] ?? null;

describe("clientIpFromHeaders", () => {
  it("prefers x-vercel-forwarded-for", () => {
    assert.equal(
      clientIpFromHeaders(from({ "x-vercel-forwarded-for": "203.0.113.7", "x-real-ip": "198.51.100.1", "x-forwarded-for": "192.0.2.9" })),
      "203.0.113.7",
    );
  });

  it("falls back to x-real-ip, then the first x-forwarded-for entry", () => {
    assert.equal(clientIpFromHeaders(from({ "x-real-ip": "198.51.100.1", "x-forwarded-for": "192.0.2.9" })), "198.51.100.1");
    assert.equal(clientIpFromHeaders(from({ "x-forwarded-for": "192.0.2.9, 10.0.0.1" })), "192.0.2.9");
  });

  it("accepts IPv6 and normalises case", () => {
    assert.equal(clientIpFromHeaders(from({ "x-real-ip": "2001:DB8::1" })), "2001:db8::1");
  });

  it("ignores values that are not IP addresses", () => {
    assert.equal(clientIpFromHeaders(from({ "x-vercel-forwarded-for": "<script>", "x-real-ip": "198.51.100.1" })), "198.51.100.1");
    assert.equal(clientIpFromHeaders(from({ "x-forwarded-for": "1".repeat(200) })), "unknown");
    assert.equal(clientIpFromHeaders(from({ "x-forwarded-for": "evil.example.com" })), "unknown");
  });

  it("returns 'unknown' when no header is present", () => {
    assert.equal(clientIpFromHeaders(from({})), "unknown");
  });
});

describe("positiveIntSetting", () => {
  it("uses the value when it is a positive integer", () => {
    assert.equal(positiveIntSetting("7", 5), 7);
  });

  it("falls back for unset, blank, zero, negative, fractional or non-numeric values", () => {
    for (const raw of [undefined, "", "  ", "0", "-3", "2.5", "abc", "NaN"]) {
      assert.equal(positiveIntSetting(raw, 5), 5, String(raw));
    }
  });
});
