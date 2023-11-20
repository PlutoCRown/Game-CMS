import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import RecipeIcon from "./RecipeIcon";
import { useGlobalStore } from "@/store";
import ItemGridLayout from "../Item/ItemGridLayout";
import { RRecipe } from "@/types/Recipe";

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

const RecipeAssetList: React.FC<{ data: RRecipe[] }> = ({ data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default RecipeAssetList;
