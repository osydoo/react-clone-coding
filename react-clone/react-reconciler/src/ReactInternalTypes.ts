import {
  ReactContext,
  ReactFormState,
  RefObject,
} from "../../shared/ReactTypes";
import { ConcurrentUpdate } from "./ReactFiberConcurrentUpdates";
import { Container, SuspenseInstance } from "./ReactFiberConfig";
import { Flags } from "./ReactFiberFlags";
import { Lane, LaneMap, Lanes } from "./ReactFiberLane";
import {
  TracingMarkerInstance,
  Transition,
} from "./ReactFiberTracingMarkerComponent";
import { RootTag } from "./ReactRootTag";
import { TypeOfMode } from "./ReactTypeOfMode";
import { WorkTag } from "./ReactWorkTags";

export type BaseFiberRootProperties = {
  tag: RootTag;
  current: Fiber | null;
  containerInfo: Container;
  // 최상위 context
  context: Object | null;
  pendingContext: Object | null;

  // Scheduler.scheduleCallback에서 온 Node
  // 다음 렌더링 task를 의미
  callbackNode: any;
  callbackPriority: Lane;
  expirationTimes: LaneMap<number>;
  hiddenUpdates: LaneMap<Array<ConcurrentUpdate> | null>;

  pendingLanes: Lanes;
  suspendedLanes: Lanes;
  pingedLanes: Lanes;
  expiredLanes: Lanes;
  errorRecoveryDisabledLanes: Lanes;
  shellSuspendCounter: number;

  finishedLanes: Lanes;

  entangledLanes: Lanes;
  entanglements: LaneMap<Lanes>;

  pooledCache: Cache | null;
  pooledCacheLanes: Lanes;

  identifierPrefix: string;

  onRecoverableError: (
    error: unknown,
    errorInfo: { digest?: string; componentStack?: string },
  ) => void;

  formState: ReactFormState<any, any> | null;
};

export type SuspenseHydrationCallbacks = {
  onHydrated?: (suspenseInstance: SuspenseInstance) => void;
  onDeleted?: (suspenseInstance: SuspenseInstance) => void;
};

type SuspenseCallbackOnlyFiberRootProperties = {
  hydrationCallbacks: null | SuspenseHydrationCallbacks;
};

type UpdaterTrackingOnlyFiberRootProperties = {
  memoizedUpdaters: Set<Fiber>;
  pendingUpdatersLaneMap: LaneMap<Set<Fiber>>;
};

type TransitionTracingOnlyFiberRootProperties = {
  transitionCallbacks: null | TransitionTracingCallbacks;
  transitionLanes: Array<Set<Transition> | null>;
  // Transitions on the root can be represented as a bunch of tracing markers.
  // Each entangled group of transitions can be treated as a tracing marker.
  // It will have a set of pending suspense boundaries. These transitions
  // are considered complete when the pending suspense boundaries set is
  // empty. We can represent this as a Map of transitions to suspense
  // boundary sets
  incompleteTransitions: Map<Transition, TracingMarkerInstance>;
};

export type TransitionTracingCallbacks = {
  onTransitionStart?: (transitionName: string, startTime: number) => void;
  onTransitionProgress?: (
    transitionName: string,
    startTime: number,
    currentTime: number,
    pending: Array<{ name: null | string }>,
  ) => void;
  onTransitionIncomplete?: (
    transitionNAme: string,
    startTime: number,
    deletions: Array<{ type: string; name?: string | null; endTime: number }>,
  ) => void;
  onTransitionComplete?: (
    transitionName: string,
    startTime: number,
    endTime: number,
  ) => void;
  onMarkerProgress?: (
    transitionName: string,
    marker: string,
    startTime: number,
    currentTime: number,
    pending: Array<{ name: null | string }>,
  ) => void;
  onMarkerIncomplete?: (
    transitionName: string,
    marker: string,
    startTime: number,
    deletions: Array<{
      type: string;
      name?: string | null;
      endTime: number;
    }>,
  ) => void;
  onMarkerComplete?: (
    transitionName: string,
    marker: string,
    startTime: number,
    endTime: number,
  ) => void;
};

export type FiberRoot = BaseFiberRootProperties &
  SuspenseCallbackOnlyFiberRootProperties &
  UpdaterTrackingOnlyFiberRootProperties &
  TransitionTracingOnlyFiberRootProperties;

// 아직 모르는 값이 많지만 여기저기서 많이 사용될 값이므로 코드를 그대로 옮겨놓음
export type Fiber = {
  tag: WorkTag;
  key: null | string;
  // element.type은 child가 reconciliation되는 동안 식별자를 보존하기 위한 값
  elementType: any;
  // The resolved function/class/ associated with this fiber.
  type: any;
  // The local state associated with this fiber.
  stateNode: any;

  // 현재 Fiber 작업이 끝난후 돌아갈 Fiber 노드 ex.부모 노드
  return: Fiber | null;

  child: Fiber | null;
  sibling: Fiber | null;
  index: number;
  ref:
    | null
    | (((handle: unknown) => void) & { _stringRef?: string | null })
    | RefObject<any>;
  refCleanup: null | (() => void);
  pendingProps: any;
  memoizedProps: any;
  updateQueue: unknown;
  memoizedState: any;
  dependencies: Dependencies | null;

  // fiber 노드와 하위 트리에 적용되는 모드나 상태를 나타내는 비트필드
  mode: TypeOfMode;

  // Effect
  flags: Flags;
  subtreeFlags: Flags;
  deletions: Array<Fiber> | null;

  lanes: Lanes;
  childLanes: Lanes;

  alternate: Fiber | null;
  actualDuration?: number;
  actualStartTime?: number;
  selfBaseDuration?: number;
  treeBaseDuration?: number;
};

export type Dependencies = {
  lanes: Lanes;
  firstContext: ContextDependency<unknown> | null;
};

export type ContextDependency<T> = {
  context: ReactContext<T>;
  next: ContextDependency<unknown> | null;
  memoizedValue: T;
};
