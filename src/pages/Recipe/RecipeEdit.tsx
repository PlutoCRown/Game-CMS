import { Button, Flex, Form, Input, Modal, theme } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useGlobalStore } from "@/store";
import { SearchOutlined } from "@ant-design/icons";
import RecipeAssetList from "./RecipeAssetList";
import ItemIcon from "../Item/ItemIcon";
import { IItem, Item } from "@/types/Biz";
import ItemGridLayout from "../Item/ItemGridLayout";

const RecipeEdit = () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const addRecipe = useGlobalStore((state) => state.recipeAction.addAsset);
  const items = useGlobalStore((state) => state.item);

  const [open, setOpen] = useState(false);
  const [pickingProduct, setPicking] = useState(false);
  const [ingredients, setIngredients] = useState<Item[]>([]);
  const [product, setProduct] = useState<Item[]>([]);

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
      ingredients: ingredients,
      products: product,
      manufacturer: quality,
    });
    form.resetFields();
    setOpen(false);
  };

  const Pick = (item: IItem) => {
    console.log(666);
    let container = pickingProduct ? setProduct : setIngredients;
    container((state) => {
      const exist = state.find((i) => i.id == item.id);
      if (exist !== undefined) {
        exist.num += 1;
        return [...state];
      } else {
        return [
          ...state,
          {
            ...item,
            num: 1,
          },
        ];
      }
    });
  };
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
            <ItemGridLayout items={items} onItemClick={Pick} />
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
                onClick={() => setPicking(false)}
                style={{
                  width: "100%",
                  backgroundColor: pickingProduct
                    ? token.colorFillContent
                    : token.colorBgSpotlight,
                  borderRadius: 8,
                  padding: 8,
                  minHeight: 54,
                }}
              >
                <ItemGridLayout
                  items={ingredients}
                  onItemClick={() => console.log("Try Remove")}
                />
              </div>
            </Form.Item>
            <Form.Item label="Product" name="product">
              <div
                onClick={() => setPicking(true)}
                style={{
                  width: "100%",
                  backgroundColor: !pickingProduct
                    ? token.colorFillContent
                    : token.colorBgSpotlight,
                  borderRadius: 8,
                  padding: 8,
                  minHeight: 54,
                }}
              >
                <ItemGridLayout
                  items={product}
                  onItemClick={() => console.log("Try Remove")}
                />
              </div>
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
