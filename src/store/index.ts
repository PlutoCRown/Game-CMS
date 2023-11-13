import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { state, action } from "./count";
import { ItemAsset, ItemAssetAction } from "./Item";

// 扩展请 & 类型
type State = typeof state &
  ReturnType<typeof action> &
  typeof ItemAsset &
  ReturnType<typeof ItemAssetAction>;

export const useGlobalStore = create<State>()(
  // persist(
  immer((set, get) => ({
    // 扩展请解在这里
    ...state,
    ...action(set, get),
    ...ItemAsset,
    ...ItemAssetAction(set, get),
  }))
  //   {
  //     name: "zustand-global-storage",
  //     storage: createJSONStorage(() => localStorage),
  //   }
  // )
);
