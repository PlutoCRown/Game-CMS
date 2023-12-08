import { ItemQualityMapColor } from "@/types/Item";
import { IRecipe, RRecipe } from "@/types/Recipe";
import React from "react";

const RecipeIcon: React.FC<{ item: RRecipe }> = ({ item }) => {
  return item && item.image !== "" && item.image !== undefined ? (
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
          ItemQualityMapColor[
            typeof item.products[0] === "object"
              ? item.products[0]?.quality
              : "normal"
          ],
      }}
    >
      {item.textIcon || item.products[0]?.textIcon}
    </div>
  );
};

export default RecipeIcon;
