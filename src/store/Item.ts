import { IItem, Item, ItemID } from "@/types/Biz";
import { ActionSet, ActionGet } from "@/types/store";
import { state } from "./count";

export const ItemAsset = {
  item: [
    {
      id: "r1",
      name: "wood",
      textIcon: "🪵",
      quality: "normal",
      description: "test item",
      image: "",
    },
    {
      id: "r4",
      name: "Apple",
      textIcon: "🍎",
      quality: "normal",
      description: "test item",
      image: "",
    },
    {
      id: "r2",
      name: "Grass",
      textIcon: "草",
      quality: "dross",
      description: "test item",
      image: "",
    },
    {
      id: "r2",
      name: "Iron",
      textIcon: "铁",
      quality: "normal",
      description: "test item",
      image: "",
    },
    {
      id: "r3",
      name: "Gear",
      textIcon: "⚙️",
      quality: "rare",
      description: "Make by Iron in hand",
      image: "",
    },
    {
      id: "r5",
      name: "Brick",
      textIcon: "🧱",
      quality: "rare",
      description: "Make by Stone in hand",
      image: "",
    },
    {
      id: "r6",
      name: "Brick",
      textIcon: "🪨",
      quality: "normal",
      description: "Make by Stone in hand",
      image: "",
    },
    {
      id: "r7",
      name: "Machine",
      textIcon: "🏭",
      quality: "legendary",
      description: "Test Machine",
      image: "",
    },
  ] as IItem[],
  inventory: [] as Item[],
};

export const ItemAssetAction = (
  set: ActionSet<typeof ItemAsset>,
  get: ActionGet<typeof ItemAsset>
) => ({
  itemAction: {
    addItemAsset: (item: IItem) =>
      set((state) => {
        state.item.push(item);
      }),
    removeItemAsset: (item: Item | ItemID) => {
      set((state) => {
        let index = -1;
        if (typeof item == "string") {
          index = state.item.findIndex((i) => i.id == item);
        } else {
          index = state.item.findIndex((i) => i.id == item.id);
        }
        if (index !== -1) {
          state.item[index] = state.item[state.item.length - 1];
        }
      });
    },
    getItem: () => get().item,
  },
});
