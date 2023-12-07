import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import RecipeIcon from "./RecipeIcon";
import { useGlobalStore } from "@/store";
import ItemGridLayout from "../Item/ItemGridLayout";
import { RRecipe } from "@/types/Recipe";
import { useRRecipe } from "@/hook/useR";
import React from "react";

const columns: ColumnsType<RRecipe> = [
  {
    title: "Icon",
    key: "textIcon",
    render: (_, record) => <RecipeIcon item={record} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, { id }) => <Tooltip title={`ID: ${id}`}>{text}</Tooltip>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Ingredient",
    key: "ingredients",
    dataIndex: "ingredients",
    render: (_, { ingredients }) => (
      <ItemGridLayout items={ingredients} onItemClick={() => {}} />
    ),
  },
  {
    title: "Products",
    key: "products",
    dataIndex: "products",
    render: (_, { products }) => (
      <ItemGridLayout items={products} onItemClick={() => {}} />
    ),
  },
];

const RecipeAssetList: React.FC = () => {
  const rRecipe = useRRecipe();
  console.log("表格你也刷啊？", rRecipe);
  return <Table columns={columns} dataSource={rRecipe} />;
};

export default React.memo(RecipeAssetList);
