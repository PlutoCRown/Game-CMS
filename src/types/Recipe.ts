import { ItemID, Item } from "./Item";
import { MachineID, IMachine } from "./Machine";

export type RecipeID = string;

// 抽象配方
export type IRecipe = {
  id: RecipeID;
  name: string;
  description: string;
  image?: string; // 可以都没有，没有就是产物的图标
  textIcon?: string;
  ingredients: { items: ItemID; num: number }[];
  products: { items: ItemID; num: number }[];
  manufacturer: MachineID | "Hand";
};

export type RRecipe = Omit<
  IRecipe,
  "ingredients" | "products" | "manufacturer"
> & {
  ingredients: Item[];
  products: Item[];
  manufacturer: IMachine | "Hand";
};
// 实例配方 ｜ 队列状
export type Recipe = IRecipe & {
  num: number;
};
