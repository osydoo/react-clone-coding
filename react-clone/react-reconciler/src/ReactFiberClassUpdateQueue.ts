import { Lane, Lanes, NoLanes } from "./ReactFiberLane";
import { Fiber } from "./ReactInternalTypes";

export type Update<State> = {
  lane: Lane;

  tag: 0 | 1 | 2 | 3;
  payload: any;
  callback: (() => unknown) | null;

  next: Update<State> | null;
};

export type SharedQueue<State> = {
  pending: Update<State> | null;
  lanes: Lanes;
  hiddenCallbacks: Array<() => unknown> | null;
};

export type UpdateQueue<State> = {
  baseState: State;
  firstBaseUpdate: Update<State> | null;
  lastBaseUpdate: Update<State> | null;
  shared: SharedQueue<State>;
  callbacks: Array<() => unknown> | null;
};

export function initializeUpdateQueue<State>(fiber: Fiber): void {
  const queue: UpdateQueue<State> = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      lanes: NoLanes,
      hiddenCallbacks: null,
    },
    callbacks: null,
  };
  fiber.updateQueue = queue;
}
