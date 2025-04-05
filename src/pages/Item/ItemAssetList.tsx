import { useGlobalStore } from "@/store";
import { IItem, ItemQualityMapColor } from "@/types/Item";
import { Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import ItemIcon from "../../components/Item/ItemIcon";
import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const ItemAssetList: React.FC<{
  onClick?: (item: IItem) => any;
}> = ({ onClick }) => {
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
    {
      title: "Action",
      key: "23",
      dataIndex: "id",
      render: (_, record) => (
        <EditOutlined
          style={{ cursor: "pointer" }}
          onClick={() => onClick && onClick(record)}
        />
      ),
    },
  ];

  const items = useGlobalStore((state) => state.item);
  return (
    <Table
      scroll={{ x: "100%" }}
      columns={columns}
      dataSource={items.map((i) => ({ ...i, key: i.id }))}
    />
  );
};

export default React.memo(ItemAssetList);
