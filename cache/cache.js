import { localCache } from './localCache';
import { isExpired, createCacheRecord, DEFAULT_TTL } from './ttl';

export class CacheManager {
  /**
   * Fetch data from cache, or resolve it using the provided fetcher function.
   * Background refetching is supported to keep cache fresh.
   */
  static async fetchWithCache(key, fetcher, options = {}) {
    const { ttl = DEFAULT_TTL, backgroundRefresh = true } = options;
    const cached = localCache.get(key);
    
    if (cached && !isExpired(cached.timestamp, ttl)) {
      // If it's valid but we want to background refresh anyway
      if (backgroundRefresh) {
        // Fetch in background and update cache silently
        setTimeout(async () => {
          try {
            const freshData = await fetcher();
            localCache.set(key, createCacheRecord(freshData));
          } catch (e) {
            console.error('Background refresh failed for', key, e);
          }
        }, 0);
      }
      return cached.data;
    }

    // Cache miss or expired
    try {
      const freshData = await fetcher();
      localCache.set(key, createCacheRecord(freshData));
      return freshData;
    } catch (e) {
      // Fallback to expired cache if offline/error
      if (cached && cached.data) {
        console.warn(`Network error, serving stale cache for ${key}`);
        return cached.data;
      }
      throw e;
    }
  }

  static invalidate(key) {
    localCache.remove(key);
  }
}
