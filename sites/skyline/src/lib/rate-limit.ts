// Simple in-memory, per-process rate limiter. Fine for a single instance;
// does NOT work correctly across multiple instances/containers — replace
// with a Redis-backed limiter before horizontal scaling. See docs/SECURITY.md.

const buckets = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || entry.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > maxAttempts;
}
