import { IItem, Item } from "@/types/Biz";
import React from "react";
import ItemIcon from "./ItemIcon";
import { Tooltip } from "antd";

const ItemGrid: React.FC<{ item: Item | IItem }> = ({ item }) => {
  return (
    <Tooltip title={item.name}>
      <div style={{ position: "relative" }}>
        <ItemIcon item={item} />
        {"num" in item && (
          <span
            style={{
              position: "absolute",
              top: "8",
              left: "8",
              width: "100%",
              fontSize: "12px",
            }}
          >
            {item.num}
          </span>
        )}
      </div>
    </Tooltip>
  );
};

export default ItemGrid;
