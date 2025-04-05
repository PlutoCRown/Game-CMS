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
      quality: "rare",
      description: "Make by Stone in hand",
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAPxJREFUOE+lkzEOwjAMRZ2VO7Cx9xDcoXOlcoKOCIkgIcaegEqdewcO0b0bd2ANsmMHJ23agSyNEv8X+9s18OcyG3rH99m4NQCK8X4VkgM4sBU9Xrw/MHaDJDqLXwIEsQDwm4OkgEgMtjdFXbpxv4PmeoHWHGaZaIAX296ArXzdvEfx63SmozQTAcQvL7QGvZClIcHlxk3Q3u4UQ+nyPqi4nBTiAez42kxgBsfng0pBT7jE0Odf3Uxh08hEPNJiai1CbJ8MijJPhDoreVl3ZNaFtH7pgIjFTDbSxACcvLr07ZI6eRqjTLoh6MKmcZNTgwJobK51Grb1M23GfgEAu3YNDjapQQAAAABJRU5ErkJggg==",
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
        const mod: IItem | any = state.item.find((i) => i.id === item.id)|| {}
        Object.keys(mod)
          .filter((i) => i !== "id")
          .forEach((k) => {
            mod[k] = item[k as keyof IItem];
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

