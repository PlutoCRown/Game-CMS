import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type StateOnly = any;

type ConfigType<T> = {
  /** 传入一个名字，如果在Provider范围之外使用，会用来报错 */
  name?: string;
  /** 传入一个函数，可以使Store具有 mounted 和 unmounted 的hook */
  effect?: (store: StoreApi<T>) => (() => void) | void;
};

export function createProviderStore<StoreType>(
  StoreBuilder: (initState: StateOnly) => StoreApi<StoreType>,
  config?: ConfigType<StoreType>
) {
  type StoreApi = ReturnType<typeof StoreBuilder>;

  const StoreContext = createContext<StoreApi | undefined>(undefined);

  interface ProviderProps {
    children: ReactNode;
    init?: DeepPartial<StoreType>;
  }

  const StoreProvider = ({ children, init }: ProviderProps) => {
    const storeRef = useRef<StoreApi | null>(null);
    if (!storeRef.current) {
      storeRef.current = StoreBuilder(init);
    }
    useEffect(() => {
      if (!config?.effect) return;
      return config.effect(storeRef.current!);
    }, []);
    return (
      <StoreContext.Provider value={storeRef.current!}>
        {children}
      </StoreContext.Provider>
    );
  };

  const useFactoryStore = <T,>(selector: (store: StoreType) => T): T => {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error(
        `${config?.name || ""} 👈 全局存储必须在Provider中使用！`
      );
    }
    return useStore(store, selector);
  };
  return {
    StoreProvider,
    useFactoryStore,
  };
}

// 直接 set({ value: newValue }) 的类型
type ImmiateValue<T> = Partial<T>;
// 用Draft的修改方式 set(draft => draft.value = newValue)
type Draft2Modify<T> = (draft: T) => void;

export type ImmerSuportModifyMethod<T> = ImmiateValue<T> | Draft2Modify<T>;
export type ImmerSetter<Store> = (
  modified: ImmerSuportModifyMethod<Store>
) => void;
