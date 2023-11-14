import { useGlobalStore } from "@/store";
import { IItem, IMachine } from "@/types/Biz";
import { ItemQualityMapColor } from "@/types/Item";
import { Space, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import ItemIcon from "../Item/ItemIcon";

const columns: ColumnsType<IMachine> = [
  {
    title: "Icon",
    key: "textIcon",
    render: (_, record) => <ItemIcon item={record.item} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, { id }) => <Tooltip title={`ID: ${id}`}>{text}</Tooltip>,
  },
  {
    title: "Recipes Count",
    key: "1",
    dataIndex: "id",
    render: (_, __) => "0",
  },
];

const PlaceableList: React.FC = () => {
  const placeable = useGlobalStore((state) => state.machine.placeable);
  return (
    <Table
      columns={columns}
      dataSource={placeable.map((i) => ({ ...i, key: i.id }))}
    />
  );
};

export default PlaceableList;
