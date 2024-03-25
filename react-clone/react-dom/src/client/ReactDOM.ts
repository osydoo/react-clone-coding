import { createRoot as createRootImpl } from "./createRoot";
import { CreateRootOptions, RootType } from "./ReactDOMRoot";

// DEV에서 레거시 createRoot사용에 경고를 띄우기 위해 deps가 여러개 존재
export const createRoot = (
  container: Element | Document | DocumentFragment,
  options?: CreateRootOptions,
): RootType => {
  return createRootImpl(container, options);
};
