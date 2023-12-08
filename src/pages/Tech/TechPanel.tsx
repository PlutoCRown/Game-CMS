import { Flex } from "antd";
import React from "react";
import TechCard from "./TechCard";
import { useGlobalStore } from "@/store";

const TechPanel: React.FC = () => {
  const tech = useGlobalStore((state) => state.technology);
  return (
    <div>
      <Flex gap={8} wrap="wrap">
        {tech.map((i) => (
          <TechCard
            item={i}
            key={i.id}
            onClick={console.log}
            status={"Ready"}
          />
        ))}
      </Flex>
    </div>
  );
};

export default TechPanel;
