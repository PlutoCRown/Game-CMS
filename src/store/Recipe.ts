import { IRecipe } from "@/types/Biz";
import { ActionSet, ActionGet } from "@/types/store";

export const RecipeAsset = {
  recipe: [] as IRecipe[],
};

export const ItemAssetAction = (
  set: ActionSet<typeof RecipeAsset>,
  get: ActionGet<typeof RecipeAsset>
) => ({
  itemAction: {
    addItemAsset: (item: IRecipe) =>
      set((state) => {
        state.recipe.push(item);
      }),
    getItem: () => get().recipe,
  },
});
