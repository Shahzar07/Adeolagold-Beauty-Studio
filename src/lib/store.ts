/**
 * A minimal external store with localStorage persistence, designed for
 * `useSyncExternalStore`.
 *
 * Reading persisted state through an external store (rather than a
 * setState-in-effect) keeps the server render and the hydration render in
 * agreement, lets React re-render once with the real value, and gives us
 * cross-tab synchronisation for free.
 */
export interface PersistentStore<T> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  set: (updater: T | ((current: T) => T)) => void;
  /** False until the browser value has been read at least once. */
  isHydrated: () => boolean;
}

export function createPersistentStore<T>(
  key: string,
  serverValue: T,
): PersistentStore<T> {
  const listeners = new Set<() => void>();
  let cache: T = serverValue;
  let loaded = false;

  const read = (): T => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : serverValue;
    } catch {
      // Storage can be unavailable (private browsing, blocked cookies).
      return serverValue;
    }
  };

  const emit = () => listeners.forEach((listener) => listener());

  const load = () => {
    if (loaded) return;
    loaded = true;
    cache = read();
  };

  return {
    subscribe(listener) {
      listeners.add(listener);

      // Keep tabs in step with one another.
      const onStorage = (event: StorageEvent) => {
        if (event.key !== key) return;
        cache = read();
        emit();
      };
      window.addEventListener("storage", onStorage);

      // The first subscription happens after hydration, so reading here can
      // never desynchronise the hydration render.
      if (!loaded) {
        load();
        // Notify on the next tick so React is not re-entered mid-commit.
        queueMicrotask(emit);
      }

      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },

    getSnapshot() {
      if (!loaded && typeof window !== "undefined") load();
      return cache;
    },

    getServerSnapshot() {
      return serverValue;
    },

    set(updater) {
      const next =
        typeof updater === "function" ? (updater as (c: T) => T)(cache) : updater;
      if (Object.is(next, cache)) return;
      cache = next;
      loaded = true;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Ignore quota and availability errors — state still works in memory.
      }
      emit();
    },

    isHydrated() {
      return loaded;
    },
  };
}
