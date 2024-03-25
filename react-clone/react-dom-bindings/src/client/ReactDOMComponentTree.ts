import { Container } from "../../../react-reconciler/src/ReactFiberConfig";
import { Fiber } from "../../../react-reconciler/src/ReactInternalTypes";

const randomKey = Math.random().toString(36).slice(2);

const internalContainerInstanceKey = "__reactContainer$" + randomKey;

export function markContainerAsRoot(
  hostRoot: Fiber | null,
  node: Container,
): void {
  (node as any)[internalContainerInstanceKey] = hostRoot;
}
