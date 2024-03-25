// Leaf 객체는 일단 복붙
import { enableCache } from "../../shared/ReactFeatureFlags";

// once it is no longer needed (releaseCache).
export function createCache(): Cache {
  if (!enableCache) {
    return null;
  }
  const cache: Cache = {
    controller: new AbortControllerLocal(),
    data: new Map(),
    refCount: 0,
  };

  return cache;
}

export type Cache = {
  controller: AbortController;
  data: Map<() => unknown, unknown>;
  refCount: number;
};

// In environments without AbortController (e.g. tests)
// replace it with a lightweight shim that only has the features we use.
const AbortControllerLocal: typeof AbortController = enableCache
  ? typeof AbortController !== "undefined"
    ? AbortController
    : // $FlowFixMe[missing-this-annot]
      // $FlowFixMe[prop-missing]
      function AbortControllerShim() {
        const listeners = [];
        const signal = (this.signal = {
          aborted: false,
          addEventListener: (type, listener) => {
            listeners.push(listener);
          },
        });

        this.abort = () => {
          signal.aborted = true;
          listeners.forEach((listener) => listener());
        };
      }
  : // $FlowFixMe[incompatible-type]
    null;

export function retainCache(cache: Cache) {
  if (!enableCache) {
    return;
  }

  cache.refCount++;
}
