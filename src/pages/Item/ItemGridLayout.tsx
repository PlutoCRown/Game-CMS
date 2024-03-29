import React from "react";
import ItemGrid from "./ItemGrid";
import ItemIcon, { Iconable } from "./ItemIcon";
import { IItem } from "@/types/Item";

const ItemGridLayout: React.FC<{
  items: IItem[] | Iconable[];
  onItemClick: (item: IItem) => void;
  onlyIcon?: boolean;
  wrap?: boolean;
}> = ({ items, onItemClick, onlyIcon, wrap }) => {
  if (items[0] && typeof items[0] == "string") {
    return <>Error</>;
  }
  return (
    <div
      className="overflow-x-scroll"
      style={{
        display: "flex",
        gap: 8,
        flexWrap: wrap ? "wrap" : "nowrap",
        overflowX: wrap ? "visible" : "scroll",
      }}
    >
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
