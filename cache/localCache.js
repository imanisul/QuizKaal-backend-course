export const localCache = {
  set(key, value) {
    if (typeof window === 'undefined') return false;
    try {
      const serialized = JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
      return true;
    } catch (e) {
      console.warn('Cache write failed', e);
      return false;
    }
  },
  
  get(key) {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item);
    } catch (e) {
      console.warn('Cache read failed', e);
      return null;
    }
  },
  
  remove(key) {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {}
  }
};
