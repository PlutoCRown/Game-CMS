import { IItem, Item } from "@/types/Biz";
import { Action } from "../types/store";

export const ItemAsset = {
  asset: [] as IItem[],
  inventory: [] as Item[],
};

export const ItemAssetAction: Action<typeof ItemAsset> = (set, _) => ({
  addItemAsset: (item: IItem) =>
    set((state) => {
      state.asset.push(item);
    }),
  // getCount: () => get().count,
});
