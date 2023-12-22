import { ActionSet, ActionGet } from "@/types/store";
import { IItem, Item, ItemID } from "@/types/Item";

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
      id: "r10",
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
      name: "Stone",
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
    getItemByID: (id: ItemID | undefined) => {
      if (!id) return null;
      return get().item.find((i) => i.id === id);
    },
    addItemAsset: (item: IItem) =>
      set((state) => {
        state.item.push(item);
      }),
    updateItemAsset: (item: IItem) =>
      set((state) => {
        Object.keys(state.item.find((i) => i.id === item.id) || {})
          .filter((i) => i !== "id")
          .forEach((k) => {
            // @ts-ignore
            mod[k] = item[k];
          });
      }),
    removeItemAsset: (item: Item | ItemID) => {
      set((state) => {
        let index = -1;
        if (typeof item == "string") {
          index = state.item.findIndex((i) => i.id === item);
        } else {
          index = state.item.findIndex((i) => i.id === item.id);
        }
        if (index !== -1) {
          state.item.splice(index, 1);
        }
      });
    },
    getItem: () => get().item,
  },
});

