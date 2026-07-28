export const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours in ms

export function isExpired(timestamp, ttl = DEFAULT_TTL) {
  if (!timestamp) return true;
  return Date.now() - timestamp > ttl;
}

export function createCacheRecord(data) {
  return {
    data,
    timestamp: Date.now()
  };
}
