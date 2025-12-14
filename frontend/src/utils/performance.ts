// Performance optimization utilities

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

export const memoize = <T extends (...args: any[]) => any>(
  func: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T => {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func(...args);
    cache.set(key, result);
    
    // Limit cache size
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      if (firstKey) {
        cache.delete(firstKey);
      }
    }
    
    return result;
  }) as T;
};

// Optimized localStorage operations
export const storage = {
  get: (key: string, defaultValue: any = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  }
};

// Fast cart operations
export const fastCart = {
  get: () => storage.get('ray-cart', []),
  set: (cart: any[]) => storage.set('ray-cart', cart),
  add: (item: any) => {
    const cart = fastCart.get();
    const existing = cart.find((i: any) => i.id === item.id);
    
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    
    fastCart.set(cart);
    return cart;
  },
  remove: (id: number) => {
    const cart = fastCart.get().filter((item: any) => item.id !== id);
    fastCart.set(cart);
    return cart;
  },
  update: (id: number, qty: number) => {
    const cart = fastCart.get().map((item: any) => 
      item.id === id ? { ...item, qty } : item
    );
    fastCart.set(cart);
    return cart;
  },
  clear: () => {
    fastCart.set([]);
    return [];
  },
  count: () => fastCart.get().reduce((total: number, item: any) => total + item.qty, 0),
  total: () => fastCart.get().reduce((total: number, item: any) => total + (item.price * item.qty), 0)
};

// Event emitter for cart updates
export const cartEvents = {
  listeners: new Set<() => void>(),
  
  subscribe: (callback: () => void) => {
    cartEvents.listeners.add(callback);
    return () => cartEvents.listeners.delete(callback);
  },
  
  emit: () => {
    cartEvents.listeners.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Event listener error:', error);
      }
    });
  }
};
