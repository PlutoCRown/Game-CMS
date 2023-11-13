import { Button, Flex, Form, Input, Modal, Slider } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import ItemAssetList from "./ItemAssetList";
import { ItemQualityArray } from "@/types/Item";
import { useGlobalStore } from "@/store";
import { SearchOutlined } from "@ant-design/icons";

const ItemEdit = () => {
  const [open, setOpen] = useState(false);
  const addItem = useGlobalStore((state) => state.itemAction.addItemAsset);
  const submitAddItem = () => {
    const { name, description, textIcon, quality } = form.getFieldsValue([
      "name",
      "description",
      "textIcon",
      "quality",
    ]);
    addItem({
      id: `Item_${Math.random().toString(36).substring(2)}`,
      name,
      description,
      textIcon,
      quality: Object.assign({}, ItemQualityArray as any)[quality],
      image: "",
    });
    form.resetFields();
    setOpen(false);
  };

  const [form] = Form.useForm();

  return (
    <>
      <Modal
        forceRender
        title="Basic Modal"
        open={open}
        onOk={submitAddItem}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Flex gap={8}>
          <Flex vertical gap={8}>
            <div
              style={{
                flexBasis: 0,
                flexGrow: 1,
                border: "3px dashed #0002",
                borderRadius: 12,
                padding: 12,
              }}
            >
              Preview
            </div>
            <div
              style={{
                flexBasis: 0,
                flexGrow: 1,
                background: "#EEE",
                borderRadius: 12,
                padding: 12,
              }}
            >
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
              ></Input>
              Icon Selector
            </div>
          </Flex>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            form={form}
            style={{ flexBasis: 0, flexGrow: 2 }}
          >
            <Form.Item label="Name" name="name">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="TextIcon" name="textIcon">
              <Input placeholder="input placeholder" max={1} />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Quality" name="quality" initialValue={1}>
              <Slider
                min={0}
                max={ItemQualityArray.length - 1}
                dots
                marks={Object.assign({}, ItemQualityArray as any)}
              />
            </Form.Item>
          </Form>
        </Flex>
      </Modal>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        block
        size="large"
        style={{ marginBottom: 8 }}
      >
        Add
      </Button>
      <ItemAssetList />
    </>
  );
};

export default ItemEdit;
