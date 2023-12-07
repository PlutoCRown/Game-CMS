export const TechStatusArray = [
  "Locked",
  "Unlocked",
  "InProgress",
  "Ready",
] as const;
export type TechStatus = (typeof TechStatusArray)[number];

export const TechStatusMapColor: Record<TechStatus, string> = {
  Locked: "#FFCDD2",
  Unlocked: "#F5AE00",
  InProgress: "#409EFF",
  Ready: "#C8E6C9",
};

import { ItemID, Item } from "./Item";
import { Recipe, RecipeID } from "./Recipe";

export type TechnologyID = string;

// 抽象技术 ｜ 存储体
export type ITechnology = {
  id: TechnologyID;
  name: string;
  description: string;
  image: string;
  textIcon: string;
  prerequisites: TechnologyID[];
  necessary: ItemID[];
  unlockRecipes: RecipeID[];
  event: { key: string; value: string }[];
};

// 实例技术 ｜ 状态
export type Technology = Omit<
  ITechnology,
  "prerequisites" | "necessary" | "unlockRecipes"
> & {
  status: TechStatus;
  prerequisites: Technology[];
  necessary: Item[];
  unlockRecipes: Recipe[];
};
