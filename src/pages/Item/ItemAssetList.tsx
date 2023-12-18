import { useGlobalStore } from "@/store";
import { IItem, ItemQualityMapColor } from "@/types/Item";
import { Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import ItemIcon from "./ItemIcon";
import React from "react";

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
      <Tag
        color={ItemQualityMapColor[quality]}
        style={quality == "normal" ? { color: "#666" } : {}}
      >
        {quality.toLocaleUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Recipes Count",
    key: "1",
    dataIndex: "id",
    render: (_, __) => "0",
  },
  {
    title: "Ingendents Count",
    key: "2",
    dataIndex: "id",
    render: (_, __) => "0",
  },
];

const ItemAssetList: React.FC<{
  onClick?: (item: IItem) => any;
}> = ({}) => {
  const items = useGlobalStore((state) => state.item);
  return (
    <Table
      // onRow={onClick}
      columns={columns}
      dataSource={items.map((i) => ({ ...i, key: i.id }))}
    />
  );
};

export default React.memo(ItemAssetList);
