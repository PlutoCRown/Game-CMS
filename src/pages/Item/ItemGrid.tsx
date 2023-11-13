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
              bottom: "0.2em",
              right: "0.5em",
              fontSize: 12,
              color: "#FFF",
              fontWeight: 900,
              WebkitTextStroke: "1px black",
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
