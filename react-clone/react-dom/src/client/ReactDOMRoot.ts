import {
  ELEMENT_NODE,
  DOCUMENT_NODE,
  DOCUMENT_FRAGMENT_NODE,
  COMMENT_NODE,
} from "../../../react-dom-bindings/src/client/HTMLNodeType";
import {
  FiberRoot,
  TransitionTracingCallbacks,
} from "../../../react-reconciler/src/ReactInternalTypes";
import { ConcurrentRoot } from "../../../react-reconciler/src/ReactRootTag";
import { allowConcurrentByDefault } from "../../../shared/ReactFeatureFlags";
import { ReactNodeList } from "../../../shared/ReactTypes";
import { FiberRoot } from "../../../react-reconciler/src/ReactInternalTypes";
import { createContainer } from "../../../react-reconciler/src/ReactFiberReconciler";
import { Container } from "../../../react-reconciler/src/ReactFiberConfig";
import { markContainerAsRoot } from "../../../react-dom-bindings/src/client/ReactDOMComponentTree";

export interface RootType {
  render(children: ReactNodeList): void;
  unmount(): void;
  _internalRoot: FiberRoot | null;
}

export type CreateRootOptions = {
  unstable_strictMode?: boolean;
  unstable_concurrentUpdatesByDefault?: boolean;
  unstable_transitionCallbacks?: TransitionTracingCallbacks;
  identifierPrefix?: string;
  onRecoverableError?: (error: unknown) => void;
};

export function isValidContainer(node: any): boolean {
  return !!(
    node &&
    (node.nodeType === ELEMENT_NODE ||
      node.nodeType === DOCUMENT_NODE ||
      node.nodeType === DOCUMENT_FRAGMENT_NODE)
  );
}

/**
 * 원래 function으로 구현되어있는거을 flow라서 그런건지 모르지만 타입에러가 발생해 변경
 * function ReactDOMRoot(this: RootType, internalRoot: FiberRoot) {
 *   this._internalRoot = internalRoot;
 * }
 */
class ReactDOMRoot {
  _internalRoot: FiberRoot | null;

  constructor(internalRoot: FiberRoot) {
    this._internalRoot = internalRoot;
  }
  render(children: ReactNodeList) {}
  unmount() {}
}

export function createRoot(
  container: Container,
  options?: CreateRootOptions,
): RootType {
  if (!isValidContainer(container)) {
    throw new Error("Target container is not a DOM element.");
  }

  let isStrictMode = false;
  let concurrentUpdatesByDefaultOverride = false;
  let identifierPrefix = "";
  let onRecoverableError = reportError;
  let transitionCallbacks = null;

  // 옵션 설정 -> 없다고 가정
  if (options !== null && options !== undefined) {
  }

  const root = createContainer(
    container,
    ConcurrentRoot,
    null,
    // options -> 제거하자!
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    onRecoverableError,
    transitionCallbacks,
  );
  markContainerAsRoot(root.current, container);

  const rootContainerElement: Container = container;

  listenToAllSupportedEvents(rootContainerElement);

  return new ReactDOMRoot(root);
}
