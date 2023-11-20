import { useGlobalStore } from "@/store";
import { Space, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import ItemIcon from "../Item/ItemIcon";
import { RMachine } from "@/types/Machine";

const columns: ColumnsType<RMachine> = [
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
  const item = useGlobalStore((state) => state.item);

  const data: RMachine[] = placeable.map((r) => ({
    ...r,
    key: r.id,
    item: item.find((m) => m.id == r.item)!,
  }));

  return <Table columns={columns} dataSource={data} />;
};

export default PlaceableList;
