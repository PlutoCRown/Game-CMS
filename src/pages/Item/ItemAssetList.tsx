import { useGlobalStore } from "@/store";
import { IItem } from "@/types/Biz";
import { ItemQualityMapColor } from "@/types/Item";
import { Space, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";

const columns: ColumnsType<IItem> = [
  {
    title: "Icon",
    key: "textIcon",
    render: (_, record) =>
      record.image !== "" ? (
        <img
          src={record.image}
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
            color: "#000c",
            textAlign: "center",
            borderRadius: 12,
            height: 48,
            backgroundColor: ItemQualityMapColor[record.quality],
          }}
        >
          {record.textIcon}
        </div>
      ),
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

const ItemAssetList = () => {
  const items = useGlobalStore((state) => state.item);
  console.log(items);
  return <Table columns={columns} dataSource={items} />;
};

export default ItemAssetList;
