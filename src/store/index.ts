import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import { persist, createJSONStorage } from "zustand/middleware";
import { state, action } from "./count";
import { ItemAsset, ItemAssetAction } from "./Item";
import { RecipeAction, RecipeAsset } from "./Recipe";

// 扩展请 & 类型
type State = typeof state &
  ReturnType<typeof action> &
  typeof ItemAsset &
  ReturnType<typeof ItemAssetAction> &
  typeof RecipeAsset &
  ReturnType<typeof RecipeAction>;

export const useGlobalStore = create<State>()(
  // persist(
  immer((set, get) => ({
    // 扩展请解在这里
    ...state,
    ...action(set, get),
    ...ItemAsset,
    ...ItemAssetAction(set, get),
    ...RecipeAsset,
    ...RecipeAction(set, get),
  }))
  //   {
  //     name: "zustand-global-storage",
  //     storage: createJSONStorage(() => localStorage),
  //   }
  // )
);
