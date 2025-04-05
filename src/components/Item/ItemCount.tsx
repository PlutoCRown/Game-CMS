import React from "react";
import ItemIcon from "./ItemIcon";
import { Tooltip } from "antd";
import { IItem, Item } from "@/types/Item";
import styles from "./index.module.css";

const ItemCount: React.FC<{ item: Item | IItem }> = ({ item }) => {
  return (
    <Tooltip title={item.name}>
      <div className={styles.relative}>
        <ItemIcon item={item} />
        {"num" in item && <span className={styles.count}>{item.num}</span>}
      </div>
    </Tooltip>
  );
};

export default ItemCount;
