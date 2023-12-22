import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import { persist, createJSONStorage } from "zustand/middleware";
import { state, action } from "./count";
import { ItemAsset, ItemAssetAction } from "./Item";
import { RecipeAction, RecipeAsset } from "./Recipe";
import { MachineAction, MachineAsset } from "./Machine";
import { TechAsset, TechnologyAction } from "./Tech";
import { createJSONStorage, persist } from "zustand/middleware";

// 扩展请 & 类型
type State = typeof state &
  typeof ItemAsset &
  typeof RecipeAsset &
  typeof TechAsset &
  typeof MachineAsset;

type Action = ReturnType<typeof action> &
  ReturnType<typeof ItemAssetAction> &
  ReturnType<typeof RecipeAction> &
  ReturnType<typeof TechnologyAction> &
  ReturnType<typeof MachineAction>;

export const useGlobalStore = create<State & Action>()(
  immer((set, get) => ({
    // 扩展请解在这里
    ...state,
    ...ItemAsset,
    ...RecipeAsset,
    ...MachineAsset,
    ...TechAsset,
    ...action(set, get),
    ...ItemAssetAction(set, get),
    ...RecipeAction(set, get),
    ...MachineAction(set, get),
    ...TechnologyAction(set, get),
  }))
);

export const useHydrateStore = create(
  persist(
    () => ({
      foo: 0,
      bar: 1,
    }),
    {
      name: "hydrated-storage",
      storage: createJSONStorage(() => localStorage),
      version: 0, // 修改内容请更新这个数值！不可以缓存
    }
  )
);
