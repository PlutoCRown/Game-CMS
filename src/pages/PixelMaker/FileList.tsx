import { usePixel } from "@/store/pixel";
import styles from "./index.module.css";
import { Flex } from "antd";

export const PixelFileList = () => {
  const list = usePixel((s) => s.list);
  return (
    <>
      {list.map((i, index) => (
        <Flex vertical align="center" className={styles.card} key={i}>
          <img src={i} alt="" width={100} />
          <span>Untitle-{index}.png</span>
        </Flex>
      ))}
    </>
  );
};
