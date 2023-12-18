import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { state, action } from "./count";
import { ItemAsset, ItemAssetAction } from "./Item";
import { RecipeAction, RecipeAsset } from "./Recipe";
import { MachineAction, MachineAsset } from "./Machine";
import { TechAsset, TechnologyAction } from "./Tech";

// 扩展请 & 类型
type State = typeof state &
  ReturnType<typeof action> &
  typeof ItemAsset &
  ReturnType<typeof ItemAssetAction> &
  typeof RecipeAsset &
  ReturnType<typeof RecipeAction> &
  typeof TechAsset &
  ReturnType<typeof TechnologyAction> &
  typeof MachineAsset &
  ReturnType<typeof MachineAction>;

export const useGlobalStore = create<State>()(
  persist(
    immer((set, get) => ({
      // 扩展请解在这里
      ...state,
      ...action(set, get),
      ...ItemAsset,
      ...ItemAssetAction(set, get),
      ...RecipeAsset,
      ...RecipeAction(set, get),
      ...MachineAsset,
      ...MachineAction(set, get),
      ...TechAsset,
      ...TechnologyAction(set, get),
    })),
    {
      name: "zustand-global-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
