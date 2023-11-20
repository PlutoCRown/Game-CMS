import React from "react";
import ItemGrid from "./ItemGrid";
import ItemIcon, { Iconable } from "./ItemIcon";
import { IItem } from "@/types/Item";

const ItemGridLayout: React.FC<{
  items: IItem[] | Iconable[];
  onItemClick: (item: IItem) => void;
  onlyIcon?: boolean;
}> = ({ items, onItemClick, onlyIcon }) => {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {items.map((i, index) => (
        <span
          onClick={() => onItemClick(i as IItem)}
          key={"id" in i ? i.id : index}
          style={{ cursor: "pointer" }}
        >
          {onlyIcon ? <ItemIcon item={i} /> : <ItemGrid item={i as IItem} />}
        </span>
      ))}
    </div>
  );
};

export default ItemGridLayout;
