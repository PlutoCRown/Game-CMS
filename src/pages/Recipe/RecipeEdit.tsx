import { Button, Flex, Form, Input, Modal, theme } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { ItemQualityArray } from "@/types/Item";
import { useGlobalStore } from "@/store";
import { SearchOutlined } from "@ant-design/icons";
import RecipeAssetList from "./RecipeAssetList";
import ItemIcon from "../Item/ItemIcon";

const RecipeEdit = () => {
  const [open, setOpen] = useState(false);
  const addRecipe = useGlobalStore((state) => state.itemAction.addItemAsset);
  const items = useGlobalStore((state) => state.item);
  const { token } = theme.useToken();
  const submitAddRecipe = () => {
    const { name, description, textIcon, quality } = form.getFieldsValue([
      "name",
      "description",
      "textIcon",
      "quality",
    ]);
    addRecipe({
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
        title="Make Recipe"
        open={open}
        onOk={submitAddRecipe}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Flex gap={8}>
          <Flex
            vertical
            gap={8}
            style={{
              flexBasis: 0,
              flexGrow: 1,
              backgroundColor: token.colorFillContent,
              borderRadius: 8,
              padding: 12,
            }}
          >
            <Input placeholder="Search..." prefix={<SearchOutlined />}></Input>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {items.map((i) => (
                <ItemIcon item={i} />
              ))}
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
            <Form.Item label="Ingredients" name="ingredients">
              <div
                style={{
                  width: "100%",
                  height: 64,
                  backgroundColor: token.colorFillContent,
                  borderRadius: 8,
                }}
              ></div>
            </Form.Item>
            <Form.Item label="Product" name="product">
              <div
                style={{
                  width: "100%",
                  height: 64,
                  backgroundColor: token.colorFillContent,
                  borderRadius: 8,
                }}
              ></div>
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
      <RecipeAssetList />
    </>
  );
};

export default RecipeEdit;
