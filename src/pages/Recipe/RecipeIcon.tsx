import { IRecipe } from "@/types/Biz";
import { ItemQualityMapColor } from "@/types/Item";
import React from "react";

const RecipeIcon: React.FC<{ item: IRecipe }> = ({ item }) => {
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
        width: 48,
        fontSize: 32,
        color: "#FFFE",
        textAlign: "center",
        userSelect: "none",
        borderRadius: 12,
        height: 48,
        overflow: "hidden",
        backgroundColor:
          ItemQualityMapColor[item.products[0]?.quality || "normal"],
      }}
    >
      {item.textIcon}
    </div>
  );
};

export default RecipeIcon;
