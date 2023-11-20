import { ITechnology, Technology } from "@/types/Biz";
import React from "react";
import ItemIcon from "../Item/ItemIcon";
import "./test.css";
import { TechStatus, TechStatusMapColor } from "@/types/Tech";

const TechCard: React.FC<
  | {
      item: ITechnology;
      onClick: (item: ITechnology) => void;
      status: TechStatus;
      size?: "small";
    }
  | {
      item: Technology;
      onClick: (item: Technology) => void;
      size: undefined;
      status: "Ready";
    }
> = ({ item, onClick, size, status }) => {
  const style = {
    width: size == "small" ? "70px" : "140px",
    height: size == "small" ? "100px" : "200px",
    backgroundColor:
      "status" in item
        ? TechStatusMapColor[item.status]
        : TechStatusMapColor[status],
    fontSize: 64,
  };
  return (
    // @ts-ignore
    <div className="tech-card" style={style} onClick={() => onClick(item)}>
      {item.textIcon}
    </div>
  );
};
export default TechCard;
