/**
 * Client IP for rate limiting. Pure (takes a header getter) so it can be
 * unit-tested without a request.
 *
 * Trust model: on Vercel the platform sets these headers itself and
 * overwrites any client-supplied X-Forwarded-For, so the values cannot be
 * spoofed by the visitor (https://vercel.com/docs/headers/request-headers).
 * `x-vercel-forwarded-for` is preferred because it survives a proxy placed in
 * front of Vercel; `x-real-ip` and the first `x-forwarded-for` entry are
 * fallbacks for other hosts. Anything that is not a plausible IPv4/IPv6
 * address is ignored, and the value is length-capped before it is used as a
 * map key.
 */

const MAX_IP_LENGTH = 45; // longest textual IPv6 (with embedded IPv4)
const IP_PATTERN = /^[0-9a-fA-F:.]+$/;

function clean(value: string | null | undefined): string | null {
  const first = value?.split(",")[0]?.trim();
  if (!first || first.length > MAX_IP_LENGTH || !IP_PATTERN.test(first)) return null;
  return first.toLowerCase();
}

export function clientIpFromHeaders(get: (name: string) => string | null): string {
  return clean(get("x-vercel-forwarded-for")) ?? clean(get("x-real-ip")) ?? clean(get("x-forwarded-for")) ?? "unknown";
}

/**
 * Parses a positive integer setting, falling back to `fallback` when unset,
 * empty, zero, negative or not a number — so a blank value copied from
 * .env.example can never turn the limit off or block every submission.
 */
export function positiveIntSetting(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw.trim() === "") return fallback;
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}
