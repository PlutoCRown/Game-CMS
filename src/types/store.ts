export type Action<T> = (
  set: (cb: (value: T) => void) => any,
  get: () => T
) => any;
