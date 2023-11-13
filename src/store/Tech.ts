import { IRecipe, ITechnology } from "@/types/Biz";
import { ActionSet, ActionGet } from "@/types/store";

export const RecipeAsset = {
  tech: [] as ITechnology[],
};

export const ItemAssetAction = (
  set: ActionSet<typeof RecipeAsset>,
  get: ActionGet<typeof RecipeAsset>
) => ({
  itemAction: {
    addItemAsset: (tech: ITechnology) =>
      set((state) => {
        state.tech.push(tech);
      }),
    getItem: () => get().tech,
  },
});
