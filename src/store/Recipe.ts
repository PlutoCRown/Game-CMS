import { IRecipe, Recipe, RecipeID } from "@/types/Biz";
import { ActionSet, ActionGet } from "@/types/store";

export const RecipeAsset = {
  recipe: [] as IRecipe[],
};

export const RecipeAction = (
  set: ActionSet<typeof RecipeAsset>,
  get: ActionGet<typeof RecipeAsset>
) => ({
  recipeAction: {
    addAsset: (item: IRecipe) =>
      set((state) => {
        state.recipe.push(item);
      }),
    removeAsset: (item: Recipe | RecipeID) => {
      set((state) => {
        let index = -1;
        if (typeof item == "string") {
          index = state.recipe.findIndex((i) => i.id == item);
        } else {
          index = state.recipe.findIndex((i) => i.id == item.id);
        }
        if (index !== -1) {
          state.recipe[index] = state.recipe[state.recipe.length - 1];
        }
      });
    },
    getRecipe: () => get().recipe,
  },
});
