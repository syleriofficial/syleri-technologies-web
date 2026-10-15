import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkRateLimit } from "../../src/lib/contact/rate-limit.ts";

describe("checkRateLimit", () => {
  it("allows up to `max` requests per window, then blocks", () => {
    const key = `test:${Math.random()}`;
    for (let i = 0; i < 5; i++) assert.equal(checkRateLimit(key, { max: 5, windowMs: 60_000 }).allowed, true, `request ${i + 1}`);
    const blocked = checkRateLimit(key, { max: 5, windowMs: 60_000 });
    assert.equal(blocked.allowed, false);
    if (!blocked.allowed) assert.ok(blocked.retryAfterMs > 0 && blocked.retryAfterMs <= 60_000);
  });

  it("tracks keys independently", () => {
    const a = `a:${Math.random()}`;
    const b = `b:${Math.random()}`;
    assert.equal(checkRateLimit(a, { max: 1, windowMs: 60_000 }).allowed, true);
    assert.equal(checkRateLimit(a, { max: 1, windowMs: 60_000 }).allowed, false);
    assert.equal(checkRateLimit(b, { max: 1, windowMs: 60_000 }).allowed, true);
  });

  it("allows requests again once the window has passed", (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
    const key = `w:${Math.random()}`;
    assert.equal(checkRateLimit(key, { max: 1, windowMs: 10_000 }).allowed, true);
    assert.equal(checkRateLimit(key, { max: 1, windowMs: 10_000 }).allowed, false);
    t.mock.timers.tick(10_001);
    assert.equal(checkRateLimit(key, { max: 1, windowMs: 10_000 }).allowed, true);
  });
});
