import { ITechnology } from "@/types/Biz";
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
    },
  ] as ITechnology[],
};

export const TechnologyAction = (
  set: ActionSet<typeof TechAsset>,
  get: ActionGet<typeof TechAsset>
) => ({
  TechnologyAction: {
    addAsset: (tech: ITechnology) =>
      set((state) => {
        state.technology.push(tech);
      }),
    getAsset: () => get().technology,
  },
});
