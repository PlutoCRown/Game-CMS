import { IMachine, IRecipe } from "@/types/Biz";
import { ActionSet, ActionGet } from "@/types/store";

export const RecipeAsset = {
  machine: [] as IMachine[],
};

export const ItemAssetAction = (
  set: ActionSet<typeof RecipeAsset>,
  get: ActionGet<typeof RecipeAsset>
) => ({
  itemAction: {
    addItemAsset: (machine: IMachine) =>
      set((state) => {
        state.machine.push(machine);
      }),
    getItem: () => get().machine,
  },
});
