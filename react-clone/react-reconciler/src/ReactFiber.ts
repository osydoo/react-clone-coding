import {
  allowConcurrentByDefault,
  enableProfilerTimer,
  forceConcurrentByDefaultForTesting,
} from "../../shared/ReactFeatureFlags";
import { NoFlags } from "./ReactFiberFlags";
import { NoLanes } from "./ReactFiberLane";
import { Fiber } from "./ReactInternalTypes";
import { RootTag, ConcurrentRoot } from "./ReactRootTag";
import {
  ConcurrentMode,
  StrictLegacyMode,
  StrictEffectsMode,
  ConcurrentUpdatesByDefaultMode,
  NoMode,
  ProfileMode,
  TypeOfMode,
} from "./ReactTypeOfMode";
import { HostRoot, WorkTag } from "./ReactWorkTags";

export function createHostRootFiber(
  tag: RootTag,
  isStrictMode: boolean,
  concurrentUpdatesByDefaultOverride: null | boolean,
): Fiber {
  let mode;
  if (tag === ConcurrentRoot) {
    mode = ConcurrentMode;
    if (isStrictMode === true) {
      mode |= StrictLegacyMode | StrictEffectsMode;
    }
    if (
      // We only use this flag for our repo tests to check both behaviors.
      forceConcurrentByDefaultForTesting
    ) {
      mode |= ConcurrentUpdatesByDefaultMode;
    } else if (
      // Only for internal experiments.
      allowConcurrentByDefault &&
      concurrentUpdatesByDefaultOverride
    ) {
      mode |= ConcurrentUpdatesByDefaultMode;
    }
  } else {
    mode = NoMode;
  }

  return createFiber(HostRoot, null, null, mode);
}

function createFiber(
  tag: WorkTag,
  pendingProps: unknown,
  key: null | string,
  mode: TypeOfMode,
): Fiber {
  return new FiberNode(tag, pendingProps, key, mode) as Fiber;
}

class FiberNode {
  tag: number;
  key: string | null;
  elementType: null;
  type: null;
  stateNode: null;
  return: null;
  child: null;
  sibling: null;
  index: number;
  ref: null;
  refCleanup: null;
  pendingProps: unknown;
  memoizedProps: null;
  updateQueue: null;
  memoizedState: null;
  dependencies: null;
  mode: number;
  flags: any;
  subtreeFlags: any;
  deletions: null;
  lanes: any;
  childLanes: any;
  alternate: null;
  constructor(
    tag: WorkTag,
    pendingProps: unknown,
    key: null | string,
    mode: TypeOfMode,
  ) {
    // Instance
    this.tag = tag;
    this.key = key;
    this.elementType = null;
    this.type = null;
    this.stateNode = null;

    // Fiber
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    this.ref = null;
    this.refCleanup = null;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.updateQueue = null;
    this.memoizedState = null;
    this.dependencies = null;

    this.mode = mode;

    // Effects
    this.flags = NoFlags;
    this.subtreeFlags = NoFlags;
    this.deletions = null;

    this.lanes = NoLanes;
    this.childLanes = NoLanes;

    this.alternate = null;
  }
}
