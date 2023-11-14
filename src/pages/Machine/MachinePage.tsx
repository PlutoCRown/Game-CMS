import { Flex } from "antd";
import PlaceableEdit from "./PlaceableEdit";
import StructureEdit from "./StructureEdit";

const MachinePage = () => {
  return (
    <Flex gap={8} style={{ backgroundColor: "#f5f5f5" }}>
      <span
        style={{
          flexBasis: 0,
          flexGrow: 1,
          background: "#fff",
          paddingRight: 8,
        }}
      >
        <PlaceableEdit />
      </span>
      <span
        style={{
          flexBasis: 0,
          flexGrow: 1,
          background: "#fff",
          paddingLeft: 8,
        }}
      >
        <StructureEdit />
      </span>
    </Flex>
  );
};

export default MachinePage;
