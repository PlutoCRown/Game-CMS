export type ActionSet<T> = (cb: (value: T) => void) => any;
export type ActionGet<T> = () => T;
