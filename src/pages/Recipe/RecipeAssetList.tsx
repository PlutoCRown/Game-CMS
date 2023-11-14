import { IRecipe } from "@/types/Biz";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import ItemIcon from "../Item/ItemIcon";
import RecipeIcon from "./RecipeIcon";
import { useGlobalStore } from "@/store";
import ItemGrid from "../Item/ItemGrid";

const columns: ColumnsType<IRecipe> = [
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
    render: (_, { ingredients }) =>
      ingredients.map((ingredient) => <ItemGrid item={ingredient} />),
  },
  {
    title: "Products",
    key: "products",
    dataIndex: "products",
    render: (_, { products }) =>
      products.map((product) => <ItemGrid item={product} />),
  },
];

const RecipeAssetList = () => {
  const recipe = useGlobalStore((state) => state.recipe);
  return <Table columns={columns} dataSource={recipe} />;
};

export default RecipeAssetList;
