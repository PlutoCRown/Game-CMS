import { useGlobalStore } from "@/store";
import { IItem, ItemQualityMapColor } from "@/types/Item";
import { Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import ItemIcon from "../../components/Item/ItemIcon";
import React from "react";
import styles from "./index.module.css";
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
      title: "Recipes",
      key: "1",
      dataIndex: "id",
      render: (_, __) => "0",
    },
    {
      title: "Ingendents",
      key: "2",
      dataIndex: "id",
      render: (_, __) => "0",
    },
  ];

  const items = useGlobalStore((state) => state.item);
  return (
    <Table
      size="small"
      scroll={{ x: "100%" }}
      className={styles.table}
      columns={columns}
      onRow={(record) => ({
        onClick: () => onClick && onClick(record),
      })}
      rowKey={(i) => i.id}
      dataSource={items}
    />
  );
};

export default React.memo(ItemAssetList);
