import styles from "./index.module.css";
import { addPixelArt } from "@/store/pixel";
import { PlusOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useState } from "react";
import { PixelFileList } from "./FileList";
import { PixelEditor } from "./Editor";

export const PixelAssets = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PixelEditor
        open={open}
        onClose={() => setOpen(false)}
        onSave={(data) => {
          addPixelArt(data);
          setOpen(false);
        }}
      />
      <Flex gap={8} wrap>
        <Flex
          onClick={() => setOpen(true)}
          className={styles.addButton}
          align="center"
          justify="center"
        >
          <PlusOutlined style={{ fontSize: 50 }} />
        </Flex>
        <PixelFileList />
      </Flex>
    </div>
  );
};
