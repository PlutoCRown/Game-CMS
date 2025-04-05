import styles from "./index.module.css";
import { ItemQuality, ItemQualityMapColor } from "@/types/Item";
import React from "react";

export type Iconable = {
  image: string;
  textIcon: string;
  num?: number;
  quality?: ItemQuality;
};

const ItemIcon: React.FC<{ item: Iconable }> = ({ item }) => {
  return item && item.image !== "" && item.image !== undefined ? (
    <img src={item.image} className={styles.imageIcon} />
  ) : (
    <div
      style={{
        color: item.quality == "normal" ? "#666" : "#FFFE",
        backgroundColor: ItemQualityMapColor[item.quality || "normal"],
      }}
      className={styles.textIcon}
    >
      {item.textIcon}
    </div>
  );
};

export default ItemIcon;
