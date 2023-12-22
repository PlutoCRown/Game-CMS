import { Button, Flex, Form, Input, Modal, Popconfirm, Slider } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useMemo, useState } from "react";
import ItemAssetList from "./ItemAssetList";
import { IItem, ItemID, ItemQualityArray } from "@/types/Item";
import { useGlobalStore } from "@/store";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { randomItemID } from "@/util/RandomID";
import { reverseObject } from "@/util/Array2Map";

const ItemEdit = () => {
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemID | null>(null);
  const addItem = useGlobalStore((state) => state.itemAction.addItemAsset);
  const removeItem = useGlobalStore(
    (state) => state.itemAction.removeItemAsset
  );
  const updateItem = useGlobalStore(
    (state) => state.itemAction.updateItemAsset
  );
  const qualityMapper = Object.assign({}, ItemQualityArray as any);
  const qualityNumber = reverseObject(qualityMapper);
  const submitAddItem = () => {
    const field = form.getFieldsValue([
      "name",
      "description",
      "textIcon",
      "quality",
    ]);
    if (editingItem) {
      updateItem({
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
      setEditingItem(item.id);
      form.setFieldsValue({
        name: item.name,
        description: item.description,
        textIcon: item.textIcon,
        quality: qualityNumber[item.quality],
        image: item.image,
      });
      setOpen(true);
    },
    [form]
  );
  const ModalProps = useMemo(
    () => ({
      forceRender: true,
      title: "Item Editor",
      width: 1000,
      footer: editingItem ? (
        <>
          <Popconfirm
            title="Are you sure?"
            description="Recipe will Lose ingredient or product! But you can still edit it."
            onConfirm={() => (
              removeItem(editingItem), setOpen(false), setEditingItem(null)
            )}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>

          <Button
            onClick={submitAddItem}
            type="primary"
            icon={<EditOutlined />}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={submitAddItem}
            type="primary"
            icon={<FileAddOutlined />}
          >
            Add
          </Button>
        </>
      ),
      onCancel: () => setOpen(false),
    }),
    [editingItem]
  );

  return (
    <>
      <Modal open={open} {...ModalProps}>
        <Flex gap={8} wrap="wrap">
          <div style={{ flex: "1 1 0", background: "#EEE", padding: 12 }}>
            <Input placeholder="Search..." prefix={<SearchOutlined />}></Input>
          </div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            form={form}
            style={{ flex: "2 0 0", minWidth: "35em" }}
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
                marks={qualityMapper}
              />
            </Form.Item>
          </Form>
        </Flex>
      </Modal>
      <Button
        type="primary"
        onClick={() => (setEditingItem(null), setOpen(true))}
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
