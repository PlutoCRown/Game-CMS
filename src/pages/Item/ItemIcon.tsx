import { ItemQuality, ItemQualityMapColor } from "@/types/Item";
import React from "react";
export type Iconable = {
  image: string;
  textIcon: string;
  num?: number;
  quality?: ItemQuality;
};
const ItemIcon: React.FC<{ item: Iconable }> = ({ item }) => {
  return item && item.image !== "" ? (
    <img
      src={item.image}
      style={{
        width: 48,
        borderRadius: 12,
        height: 48,
      }}
    />
  ) : (
    <div
      style={{
        boxSizing: "content-box",
        border: "3px solid #0001",
        userSelect: "none",
        width: 48,
        fontSize: 32,
        color: "#FFFE",
        textAlign: "center",
        borderRadius: 12,
        height: 48,
        overflow: "hidden",
        backgroundColor: ItemQualityMapColor[item.quality || "normal"],
      }}
    >
      {item.textIcon}
    </div>
  );
};

export default ItemIcon;
