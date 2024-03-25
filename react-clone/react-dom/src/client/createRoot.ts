import { COMMENT_NODE } from "../../../react-dom-bindings/src/client/HTMLNodeType";
import { ConcurrentRoot } from "../../../react-reconciler/src/ReactRootTag";
import {
  CreateRootOptions,
  RootType,
  isValidContainer,
  ReactDOMRoot,
} from "./ReactDOMRoot";

export function createRoot(
  container: Element | Document | DocumentFragment,
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

  const rootContainerElement: Document | Element | DocumentFragment =
    container.nodeType === COMMENT_NODE
      ? (container.parentNode as any)
      : container;

  listenToAllSupportedEvents(rootContainerElement);

  return new ReactDOMRoot(root);
}
