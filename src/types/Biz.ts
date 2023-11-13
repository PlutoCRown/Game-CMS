import { ItemQuality } from "./Item";

export type ItemID = string;
export type TechnologyID = string;
export type RecipeID = string;
export type MachineID = string;

// 抽象技术 ｜ 存储体
export type ITechnology = {
  id: TechnologyID;
  name: string;
  description: string;
  image: string;
  textIcon: string;
  prerequisites: TechnologyID[];
  necessary: ItemID[];
};

// 实例技术 ｜ 状态
export type Technology = Omit<ITechnology, "prerequisites" | "necessary"> & {
  status: "Researched" | "unlocked" | "locked";
  prerequisites: Technology[];
  necessary: Item[];
};

// 抽象物品 ｜ 存储体
export type IItem = {
  id: ItemID;
  name: string;
  description: string;
  image: string;
  textIcon: string;
  // 灰 白 绿 蓝 紫 红
  quality: ItemQuality;
};

// 实例物品 ｜ 含状态
export type Item = IItem & {
  num: number;
  attr: any;
};

// 抽象配方
export type IRecipe = {
  id: RecipeID;
  name: string;
  description: string;
  image: string;
  textIcon: string;
  ingredients: IItem[];
  manufacturer: Machine;
};

// 实例配方 ｜ 队列状
export type Recipe = IRecipe & {
  num: number;
};

// 抽象设备 ｜ 继承一个可放置物 | Q:一个物品可以放出多种东西？A:是。
export type IMachine = {
  id: MachineID;
  name: string;
  item: IItem;
  image: string;
  textIcon: string;
};

// 实例设备 ｜ 当科技解锁配方时推入配方
export type Machine = IMachine & {
  recipes: IRecipe[];
};
