import "server-only";

/**
 * Best-effort in-memory sliding-window rate limiter, keyed by caller
 * (normally the client IP). This protects a single warm serverless
 * instance; it does not share state across instances or regions, so a
 * determined attacker spread across many cold starts can exceed it.
 *
 * That's a real limitation of doing this without external storage (Vercel
 * KV / Upstash Redis). It still stops the overwhelming majority of
 * automated form spam, which tends to hammer a single endpoint in a tight
 * loop from one connection. For stronger guarantees, back this with
 * Vercel KV or Upstash and keep the same function signature.
 */

const buckets = new Map<string, number[]>();

// Opportunistic cleanup so the map doesn't grow unbounded over the life of
// a warm instance.
const MAX_TRACKED_KEYS = 5000;

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterMs: number };

export function checkRateLimit(key: string, options: { max: number; windowMs: number }): RateLimitResult {
  const { max, windowMs } = options;
  const now = Date.now();
  const cutoff = now - windowMs;

  const existing = buckets.get(key) ?? [];
  const recent = existing.filter((ts) => ts > cutoff);

  if (recent.length >= max) {
    const oldest = recent[0] ?? now;
    buckets.set(key, recent);
    return { allowed: false, retryAfterMs: Math.max(0, oldest + windowMs - now) };
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > MAX_TRACKED_KEYS) {
    for (const [k, timestamps] of buckets) {
      if (timestamps.every((ts) => ts <= cutoff)) buckets.delete(k);
    }
  }

  return { allowed: true };
}
