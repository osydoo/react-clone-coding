import { Container } from "./ReactFiberConfig";
import { createFiberRoot } from "./ReactFiberRoot";
import {
  FiberRoot,
  SuspenseHydrationCallbacks,
  TransitionTracingCallbacks,
} from "./ReactInternalTypes";
import { RootTag } from "./ReactRootTag";

type OpaqueRoot = FiberRoot;

export function createContainer(
  containerInfo: Container,
  tag: RootTag,
  hydrationCallbacks: null | SuspenseHydrationCallbacks,
  isStrictMode: boolean,
  concurrentUpdatesByDefaultOverride: null | boolean,
  identifierPrefix: string,
  onRecoverableError: (error: unknown) => void,
  transitionCallbacks: null | TransitionTracingCallbacks,
): OpaqueRoot {
  // TODO: 무엇일가?
  const hydrate = false;
  const initialChildren = null;
  return createFiberRoot(
    containerInfo,
    tag,
    hydrate,
    initialChildren,
    hydrationCallbacks,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    onRecoverableError,
    transitionCallbacks,
    null,
  );
}
