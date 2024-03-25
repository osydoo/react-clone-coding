import { OffscreenInstance } from "./ReactFiberActivityComponent";

export type Transition = {
  name: string;
  startTime: number;
};

export type TracingMarkerInstance = {
  tag?: TracingMarkerTag;
  transitions: Set<Transition> | null;
  pendingBouindaries: PendingBoundaries | null;
  aborts: Array<TransitionAbort> | null;
  name: string | null;
};

export type TransitionAbort = {
  reasom: "error" | "unknown" | "marker" | "suspense";
  name?: string | null;
};

export type PendingBoundaries = Map<OffscreenInstance, SuspenseInfo>;

export type TracingMarkerTag = 0 | 1;

export type SuspenseInfo = { name: string | null };
