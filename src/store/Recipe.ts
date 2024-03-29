import { IRecipe, Recipe, RecipeID } from "@/types/Recipe";
import { ActionSet, ActionGet } from "@/types/store";

export const RecipeAsset = {
  recipe: [
    {
      id: "c1",
      name: "cook",
      description: "",
      textIcon: "⚙️",
      ingredients: [
        {
          items: "r10",
          num: 2,
        },
      ],
      products: [
        {
          items: "r3",
          num: 1,
        },
      ],
      manufacturer: "m1",
    },
  ] as IRecipe[],
};

export const RecipeAction = (
  set: ActionSet<typeof RecipeAsset>,
  get: ActionGet<typeof RecipeAsset>
) => ({
  recipeAction: {
    getRecipeByID: (id: RecipeID | undefined) => {
      if (!id) return null;
      return get().recipe.find((i) => i.id === id);
    },
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
