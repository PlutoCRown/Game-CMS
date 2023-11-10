import { Button, Flex, Form, Input, Modal, Slider } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import ItemAssetList from "./ItemAssetList";
import { ItemQualityArray } from "@/types/Item";
import { useGlobalStore } from "@/store";

const ItemEdit = () => {
  const [open, setOpen] = useState(false);
  const {} = useGlobalStore();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        forceRender
        title="Basic Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        width={1000}
      >
        <Flex>
          <div
            style={{
              flexBasis: 0,
              flexGrow: 1,
              background: "#EEE",
              borderRadius: 12,
              padding: 12,
            }}
          >
            Asset
          </div>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            form={form}
            style={{ flexBasis: 0, flexGrow: 2 }}
          >
            <Form.Item label="Name">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="TextIcon">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Quality">
              <Slider
                min={0}
                max={ItemQualityArray.length - 1}
                dots
                defaultValue={1}
                marks={Object.assign({}, ItemQualityArray as any)}
              />
            </Form.Item>
          </Form>
        </Flex>
      </Modal>
      <ItemAssetList />
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
    </>
  );
};

export default ItemEdit;
