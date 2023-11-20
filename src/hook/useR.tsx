import { useGlobalStore } from "@/store";
import { RMachine } from "@/types/Machine";
import { RRecipe } from "@/types/Recipe";

export const useRRecipe: () => RRecipe[] = () => {
  const recipe = useGlobalStore((state) => state.recipe);
  const items = useGlobalStore((state) => state.item);
  const placeable = useGlobalStore((state) => state.machine.placeable);
  debugger;
  const res = recipe.map(
    (r) =>
      ({
        ...r,
        ingredients: r.ingredients.map((i) => items.find((ii) => ii.id == i)),
        products: r.products.map((i) => items.find((ii) => ii.id == i)),
        manufacturer: placeable.find((m) => m.id == r.manufacturer) || "Hand",
      } as RRecipe)
  );
  console.log(res);
  return res;
};

export const useRMachine: () => RMachine[] = () => {
  const items = useGlobalStore((state) => state.item);
  const placeable = useGlobalStore((state) => state.machine.placeable);

  return placeable.map((r) => ({
    ...r,
    key: r.id,
    item: items.find((m) => m.id == r.item)!,
  }));
};

export const useRTech: () => any[] = () => {
  const recipe = useGlobalStore((state) => state.recipe);
  const items = useGlobalStore((state) => state.item);
  const placeable = useGlobalStore((state) => state.machine.placeable);

  return [];
};
