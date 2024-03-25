import {
  enableCache,
  enableProfilerCommitHooks,
  enableProfilerTimer,
  enableSuspenseCallback,
  enableTransitionTracing,
  enableUpdaterTracking,
} from "../../shared/ReactFeatureFlags";
import { ReactFormState, ReactNodeList } from "../../shared/ReactTypes";
import { createHostRootFiber } from "./ReactFiber";
import { createCache, retainCache } from "./ReactFiberCacheComponent";
import { initializeUpdateQueue } from "./ReactFiberClassUpdateQueue";
import { Container, noTimeout } from "./ReactFiberConfig";
import {
  NoLane,
  NoLanes,
  NoTimestamp,
  TotalLanes,
  createLaneMap,
} from "./ReactFiberLane";
import {
  SuspenseHydrationCallbacks,
  TransitionTracingCallbacks,
  FiberRoot,
} from "./ReactInternalTypes";
import { RootTag } from "./ReactRootTag";

export type RootState = {
  element: any;
  isDehydrated: boolean;
  cache: Cache;
};

export function createFiberRoot(
  containerInfo: Container,
  tag: RootTag,
  hydrate: boolean,
  initialChildren: ReactNodeList,
  hydrationCallbacks: null | SuspenseHydrationCallbacks,
  isStrictMode: boolean,
  concurrentUpdatesByDefaultOverride: null | boolean,
  // TODO: We have several of these arguments that are conceptually part of the
  // host config, but because they are passed in at runtime, we have to thread
  // them through the root constructor. Perhaps we should put them all into a
  // single type, like a DynamicHostConfig that is defined by the renderer.
  identifierPrefix: string,
  onRecoverableError: null | ((error: unknown) => void),
  transitionCallbacks: null | TransitionTracingCallbacks,
  formState: ReactFormState<any, any> | null,
): FiberRoot {
  // $FlowFixMe[invalid-constructor] Flow no longer supports calling new on functions
  const root: FiberRoot = new FiberRootNode(
    containerInfo,
    tag,
    hydrate,
    identifierPrefix,
    onRecoverableError,
    formState,
  ) as FiberRoot;
  if (enableSuspenseCallback) {
    root.hydrationCallbacks = hydrationCallbacks;
  }

  if (enableTransitionTracing) {
    root.transitionCallbacks = transitionCallbacks;
  }

  // Cyclic construction. This cheats the type system right now because
  // stateNode is any.
  const uninitializedFiber = createHostRootFiber(
    tag,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
  );
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  if (enableCache) {
    const initialCache = createCache();
    retainCache(initialCache);

    root.pooledCache = initialCache;
    retainCache(initialCache);
    const initialState: RootState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: initialCache,
    };
    uninitializedFiber.memoizedState = initialState;
  } else {
    const initialState: RootState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: null, // not enabled yet
    };
    uninitializedFiber.memoizedState = initialState;
  }

  initializeUpdateQueue(uninitializedFiber);

  return root;
}

class FiberRootNode {
  tag: any;
  containerInfo: any;
  pendingChildren: null;
  current: null;
  pingCache: null;
  finishedWork: null;
  timeoutHandle: number;
  cancelPendingCommit: null;
  context: null;
  pendingContext: null;
  next: null;
  callbackNode: null;
  callbackPriority: number;
  expirationTimes: import("/Users/dongwoo/Documents/GitHub/react-clone-coding/react-clone/react-reconciler/src/ReactFiberLane").LaneMap<number>;
  pendingLanes: number;
  suspendedLanes: number;
  pingedLanes: number;
  expiredLanes: number;
  finishedLanes: number;
  errorRecoveryDisabledLanes: number;
  shellSuspendCounter: number;
  entangledLanes: number;
  entanglements: import("/Users/dongwoo/Documents/GitHub/react-clone-coding/react-clone/react-reconciler/src/ReactFiberLane").LaneMap<number>;
  hiddenUpdates: import("/Users/dongwoo/Documents/GitHub/react-clone-coding/react-clone/react-reconciler/src/ReactFiberLane").LaneMap<null>;
  identifierPrefix: any;
  onRecoverableError: any;
  pooledCache!: null;
  pooledCacheLanes!: number;
  hydrationCallbacks!: null;
  formState: ReactFormState<any, any> | null;
  incompleteTransitions: Map<any, any>;
  transitionCallbacks!: null;
  transitionLanes!: never[];
  effectDuration!: number;
  passiveEffectDuration!: number;
  memoizedUpdaters!: Set<unknown>;
  pendingUpdatersLaneMap!: never[];
  constructor(
    containerInfo: any,
    tag: any,
    hydrate: any,
    identifierPrefix: any,
    onRecoverableError: any,
    formState: ReactFormState<any, any> | null,
  ) {
    this.tag = tag;
    this.containerInfo = containerInfo;
    this.pendingChildren = null;
    this.current = null;
    this.pingCache = null;
    this.finishedWork = null;
    this.timeoutHandle = noTimeout;
    this.cancelPendingCommit = null;
    this.context = null;
    this.pendingContext = null;
    this.next = null;
    this.callbackNode = null;
    this.callbackPriority = NoLane;
    this.expirationTimes = createLaneMap(NoTimestamp);

    this.pendingLanes = NoLanes;
    this.suspendedLanes = NoLanes;
    this.pingedLanes = NoLanes;
    this.expiredLanes = NoLanes;
    this.finishedLanes = NoLanes;
    this.errorRecoveryDisabledLanes = NoLanes;
    this.shellSuspendCounter = 0;

    this.entangledLanes = NoLanes;
    this.entanglements = createLaneMap(NoLanes);

    this.hiddenUpdates = createLaneMap(null);

    this.identifierPrefix = identifierPrefix;
    this.onRecoverableError = onRecoverableError;

    if (enableCache) {
      this.pooledCache = null;
      this.pooledCacheLanes = NoLanes;
    }

    if (enableSuspenseCallback) {
      this.hydrationCallbacks = null;
    }

    this.formState = formState;

    this.incompleteTransitions = new Map();
    if (enableTransitionTracing) {
      this.transitionCallbacks = null;
      const transitionLanesMap = (this.transitionLanes = []);
      for (let i = 0; i < TotalLanes; i++) {
        transitionLanesMap.push(null);
      }
    }

    if (enableProfilerTimer && enableProfilerCommitHooks) {
      this.effectDuration = 0;
      this.passiveEffectDuration = 0;
    }

    if (enableUpdaterTracking) {
      this.memoizedUpdaters = new Set();
      const pendingUpdatersLaneMap = (this.pendingUpdatersLaneMap = []);
      for (let i = 0; i < TotalLanes; i++) {
        pendingUpdatersLaneMap.push(new Set());
      }
    }
  }
}
