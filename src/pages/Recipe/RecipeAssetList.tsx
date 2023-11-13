import { useGlobalStore } from "@/store";
import { IItem } from "@/types/Biz";
import { ItemQualityMapColor } from "@/types/Item";
import { Space, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import ItemIcon from "../Item/ItemIcon";

const columns: ColumnsType<IItem> = [
  {
    title: "Icon",
    key: "textIcon",
    render: (_, record) => <ItemIcon item={record} />,
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
    width: 1000,
    key: "description",
  },
  {
    title: "Quality",
    key: "quality",
    dataIndex: "quality",
    render: (_, { quality }) => (
      <Tag color={ItemQualityMapColor[quality]}>{quality}</Tag>
    ),
  },
  {
    title: "Recipes Count",
    key: "id",
    dataIndex: "id",
    render: (_, __) => "0",
  },
  {
    title: "Ingendents Count",
    key: "id",
    dataIndex: "id",
    render: (_, __) => "0",
  },
];

const RecipeAssetList = () => {
  const items = useGlobalStore((state) => state.item);
  return <Table columns={columns} dataSource={items} />;
};

export default RecipeAssetList;
