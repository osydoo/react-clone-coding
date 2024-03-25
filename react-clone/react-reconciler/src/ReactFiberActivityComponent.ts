import { Wakeable } from "../../shared/ReactTypes";
import {
  TracingMarkerInstance,
  Transition,
} from "./ReactFiberTracingMarkerComponent";

type OffscreenVisibility = number;

export const OffscreenVisible = /*                     */ 0b001;
export const OffscreenDetached = /*                    */ 0b010;
export const OffscreenPassiveEffectsConnected = /*     */ 0b100;

export type OffscreenInstance = {
  _pendingVisibility: OffscreenVisibility;
  _visibility: OffscreenVisibility;
  _pendingMarkers: Set<TracingMarkerInstance> | null;
  _transitions: Set<Transition> | null;
  _retryCache: WeakSet<Wakeable> | Set<Wakeable> | null;
};
