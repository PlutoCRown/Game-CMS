import { IRecipe } from "@/types/Biz";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import ItemIcon from "../Item/ItemIcon";
import RecipeIcon from "./RecipeIcon";

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
      ingredients.map((ingredient) => <ItemIcon item={ingredient} />),
  },
  {
    title: "Products",
    key: "products",
    dataIndex: "products",
    render: (_, { products }) =>
      products.map((product) => <ItemIcon item={product} />),
  },
];

const RecipeAssetList = () => {
  // const items = useGlobalStore((state) => state.item);
  return <Table columns={columns} dataSource={[]} />;
};

export default RecipeAssetList;
