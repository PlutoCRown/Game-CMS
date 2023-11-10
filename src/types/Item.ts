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
