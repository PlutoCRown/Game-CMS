import { IItem, ItemID } from "./Item";
import { IRecipe } from "./Recipe";

export type MachineID = string;

// 抽象设备 ｜ 继承一个可放置物 | Q:一个物品可以放出多种东西？A:是。
export type IMachine = {
  id: MachineID;
  name: string;
  item: ItemID;
  image: string;
  textIcon: string;
  fuelType: "N" | "E" | "M"; // 无/电/法
  fuelValue: number;
  slotType: "fixed" | "free";
};

// 实例设备 ｜ 当科技解锁配方时推入配方
export type Machine = IMachine & {
  recipes: IRecipe[];
};

export type RMachine = Omit<IMachine, "item"> & {
  item: IItem;
};
