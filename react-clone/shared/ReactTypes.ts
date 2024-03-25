export type ReactNode = any;

export type ReactEmpty = null | void | boolean;

export interface ReactElement<P = any, T = any> {
  type: T;
  props: P;
  key: string | null;
}

export type ReactNodeList = ReactEmpty | ReactNode;

export interface Wakeable {
  then(onFulfill: () => unknown, onReject: () => unknown): void | Wakeable;
}

export type RefObject<T> = {
  current: T | null;
};

export type ReactContext<T> = {
  $$typeof: symbol | number;
  Consumer: ReactConsumerType<T>;
  Provider: ReactContext<T>;
  _currentValue: T;
  _currentValue2: T;
  _threadCount: number;
  displayName?: string;
};

export type ReactConsumerType<T> = {
  $$typeof: symbol | number;
  _context: ReactContext<T>;
};

// decodeFormState의 타입으로 서버와 client간 state를 맞추기 위한 타입
export type ReactFormState<S, ReferenceId> = [
  S /* actual state value */,
  string /* key path */,
  ReferenceId /* Server Reference ID */,
  number /* number of bound arguments */,
];
