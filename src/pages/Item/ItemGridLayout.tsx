import { IItem } from "@/types/Biz";
import React from "react";
import ItemGrid from "./ItemGrid";

const ItemGridLayout: React.FC<{
  items: IItem[];
  onItemClick: (item: IItem) => void;
}> = ({ items, onItemClick }) => {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {items.map((i) => (
        <span
          onClick={() => onItemClick(i)}
          key={i.id}
          style={{ cursor: "pointer" }}
        >
          <ItemGrid item={i} />
        </span>
      ))}
    </div>
  );
};

export default ItemGridLayout;
