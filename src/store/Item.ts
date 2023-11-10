import { IItem, Item } from "@/types/Biz";
import { ActionSet, ActionGet } from "@/types/store";

export const ItemAsset = {
  item: [
    {
      id: "r1",
      name: "wood",
      textIcon: "W",
      quality: "normal",
      description: "test item",
      image: "",
    },
    {
      id: "r2",
      name: "Grass",
      textIcon: "G",
      quality: "dross",
      description: "test item",
      image: "",
    },
  ] as IItem[],
  inventory: [] as Item[],
};

export const ItemAssetAction = (
  set: ActionSet<typeof ItemAsset>,
  get: ActionGet<typeof ItemAsset>
) =>
  ({
    addItemAsset: (item: IItem) =>
      set((state) => {
        state.item.push(item);
      }),
    getItem: () => get().item,
  } as const);

