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

const RecipeAssetList = () => {
  const recipe = useGlobalStore((state) => state.recipe);
  const item = useGlobalStore((state) => state.item);
  const machine = useGlobalStore((state) => state.machine.placeable);

  const datac: RRecipe[] = recipe.map((r) => ({
    ...r,
    ingredients: r.ingredients.map((i) => item.find((ii) => ii.id == i)),
    products: r.products.map((i) => item.find((ii) => ii.id == i)),
    manufacturer: machine.find((m) => m.id == r.manufacturer),
  }));

  return <Table columns={columns} dataSource={datac} />;
};

export default RecipeAssetList;
