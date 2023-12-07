import React from "react";
import ItemIcon from "./ItemIcon";
import { Flex } from "antd";
import { IItem } from "@/types/Item";

const ItemPreview: React.FC<{
  item?: IItem | null;
}> = ({ item }) => {
  return (
    <div
      style={{
        flexBasis: 0,
        flexGrow: 1,
        border: item ? "1px solid #0003" : "3px dashed #0002",
        borderRadius: 12,
        padding: 12,
      }}
    >
      {item && (
        <Flex gap={8}>
          <ItemIcon item={item} />
          <Flex vertical justify="center">
            <div style={{ fontWeight: "bold" }}>{item.name}</div>
            <div style={{ color: "#666" }}>{item.description}</div>
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default ItemPreview;
