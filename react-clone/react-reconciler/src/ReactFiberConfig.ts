/**
 * React를 실행하는 환경에 따라 달라짐
 *
 * 이 파일은 React의 소스 코드 일부로, React의 구현 세부사항 중 하나인 "React Fiber"와 관련된 설정 파일(ReactFiberConfig)에 대한 설명을 포함하고 있습니다. 파일 내용을 보면, 실제 구현이 포함되어 있지 않고 경고 메시지를 발생시키는 코드만 포함되어 있습니다. 이는 의도적인 설계입니다.
 * React는 다양한 환경(웹, 네이티브, 메모리, 테스트 등)에서 작동할 수 있도록 설계되어 있으며, 각 환경에 따라 다른 "호스트 구성(host config)"을 필요로 합니다. 이러한 호스트 구성은 React의 렌더러(예: ReactDOM, React Native 등)에 의해 제공되며, 각 렌더러는 특정 환경에 맞게 React의 동작을 조정합니다.
 * 해당 파일에서 언급하는 "shim"은 소프트웨어 개발에서 특정 기능이나 모듈을 대체하기 위해 사용되는 코드 조각 또는 라이브러리를 의미합니다. 이 경우, 파일 내용은 실제 구현 대신 플레이스홀더 역할을 하며, 개발자가 실수로 잘못된 구성을 사용하여 이 파일을 참조하게 되었을 때, 침묵하지 않고 명시적인 오류를 발생시키도록 설계되어 있습니다.
 * 즉, 이 파일은 React의 빌드나 테스트 과정에서 정상적인 경로를 통해 해석되어서는 안 되는 파일입니다. 대신, 각 환경에 맞는 구체적인 구현이 제공되어야 하며, 그 구현은 React의 렌더러를 통해 제공됩니다. 따라서, 여러분이 찾고 있는 Container 타입에 대한 구현이나 정의를 보려면, 사용하고 있는 렌더러의 소스 코드나 해당 환경에 맞는 구성 파일을 찾아보아야 합니다.
 * 결론적으로, 이 파일이 비어 있는 것은 잘못된 것이 아니며, React의 설계와 구성 방식의 일부입니다. 특정 타입이나 구현에 대한 정보를 찾고 싶다면, 특정 환경을 위한 React 렌더러의 소스 코드를 살펴보는 것이 좋습니다.
 */

import { FiberRoot } from "./ReactInternalTypes";

// packages/react-dom-bindings/src/client/ReactFiberConfigDOM.js
export type Container = Element | Document | DocumentFragment;

interface Element {
  _reactRootContainer?: FiberRoot;
}

interface Document {
  _reactRootContainer?: FiberRoot;
}

interface DocumentFragment {
  _reactRootContainer?: FiberRoot;
}

// packages/react-noop-renderer/src/ReactNoopServer.js
export type SuspenseInstance = {
  state: "pending" | "complete" | "client-render";
  children: Array<Instance | TextInstance | SuspenseInstance>;
};

type TextInstance = {
  text: string;
  hidden: boolean;
};

type Instance = {
  type: string;
  children: Array<Instance | TextInstance | SuspenseInstance>;
  prop: any;
  hidden: boolean;
};

export const noTimeout = -1;
