import React from "react";
import "./test.css";
import {
  ITechnology,
  TechStatus,
  TechStatusMapColor,
  Technology,
} from "@/types/Tech";

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
    "--tech-name": `"${item.name}"`,
    width: size == "small" ? "70px" : "105px",
    height: size == "small" ? "100px" : "150px",
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
