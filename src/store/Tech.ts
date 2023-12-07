import { ITechnology, TechnologyID } from "@/types/Tech";
import { ActionSet, ActionGet } from "@/types/store";

export const TechAsset = {
  technology: [
    {
      id: "t1",
      name: "test tech",
      description: "string",
      image: "",
      textIcon: "🔯",
      prerequisites: [],
      necessary: [],
      event: [],
      unlockRecipes: [],
    },
  ] as ITechnology[],
};

export const TechnologyAction = (
  set: ActionSet<typeof TechAsset>,
  get: ActionGet<typeof TechAsset>
) => ({
  TechnologyAction: {
    getTechByID: (id: TechnologyID | undefined) => {
      if (!id) return null;
      return get().technology.find((i) => i.id === id);
    },
    addAsset: (tech: ITechnology) =>
      set((state) => {
        state.technology.push(tech);
      }),
    getAsset: () => get().technology,
  },
});
