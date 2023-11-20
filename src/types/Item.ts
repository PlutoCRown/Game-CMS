export const ItemQualityArray = [
  "dross",
  "normal",
  "rare",
  "epic",
  "legendary",
  "mythic",
] as const;
export type ItemQuality = (typeof ItemQualityArray)[number];

export const ItemQualityMapColor: Record<ItemQuality, string> = {
  dross: "#CCCCCC",
  normal: "#F5F5F5",
  rare: "#C8E6C9",
  epic: "#BBDEFB",
  legendary: "#E1BEE7",
  mythic: "#FFCDD2",
};

export type ItemID = string;

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
  attr?: any;
};