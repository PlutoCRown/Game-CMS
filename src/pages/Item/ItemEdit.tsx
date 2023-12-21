import { Button, Flex, Form, Input, Modal, Slider } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useMemo, useState } from "react";
import ItemAssetList from "./ItemAssetList";
import { IItem, ItemID, ItemQualityArray } from "@/types/Item";
import { useGlobalStore } from "@/store";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ItemPreview from "./ItemPreview";
import { randomItemID } from "@/util/RandomID";

const ItemEdit = () => {
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemID | null>(null);
  const addItem = useGlobalStore((state) => state.itemAction.addItemAsset);
  const qualityMapper = Object.assign({}, ItemQualityArray as any);
  const submitAddItem = () => {
    const field = form.getFieldsValue([
      "name",
      "description",
      "textIcon",
      "quality",
    ]);
    if (editingItem) {
      addItem({
        id: editingItem,
        ...field,
        quality: qualityMapper[field.quality],
        image: "",
      });
    } else {
      addItem({
        id: randomItemID(),
        ...field,
        quality: qualityMapper[field.quality],
        image: "",
      });
    }
    form.resetFields();
    setOpen(false);
  };
  const [form] = Form.useForm();

  const openEditDialog = useCallback(
    (item: IItem) => {
      console.log(item);
      // setEditingItem(item.id);
      // form.setFieldsValue({
      //   name: item.name,
      //   description: item.description,
      //   textIcon: item.textIcon,
      //   quality: item.quality,
      //   image: item.image,
      // });
      // setOpen(true);
    },
    [form]
  );

  const ModalProps = useMemo(
    () => ({
      forceRender: true,
      title: "Item Editor",
      onOk: submitAddItem,
      onCancel: () => setOpen(false),
      width: 1000,
      okButtonProps: {
        icon: editingItem ? <EditOutlined /> : <FileAddOutlined />,
      },
      okText: editingItem ? "Save" : "Add",
      cancelText: editingItem ? "Delete" : "Cancel",
      cancelButtonProps: {
        ...(editingItem ? { danger: true, type: "primary" as "primary" } : {}),
        icon: editingItem ? <DeleteOutlined /> : <CloseOutlined />,
      },
    }),
    [editingItem]
  );

  return (
    <>
      <Modal open={open} {...ModalProps}>
        <Flex gap={8}>
          <Flex vertical gap={8} style={{ flexShrink: 1 }}>
            <ItemPreview />
            <div
              style={{
                flexBasis: 0,
                flexGrow: 1,
                background: "#EEE",
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
            style={{ flexBasis: 0, flexGrow: 2, minWidth: "35em" }}
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
      <ItemAssetList onClick={openEditDialog} />
    </>
  );
};

export default ItemEdit;
