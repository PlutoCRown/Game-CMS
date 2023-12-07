import { Button, Flex, Form, Input, Modal, message, theme } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useGlobalStore } from "@/store";
import { SearchOutlined } from "@ant-design/icons";
import RecipeAssetList from "./RecipeAssetList";
import ItemGridLayout from "../Item/ItemGridLayout";
import ItemPreview from "../Item/ItemPreview";
import { ItemID, IItem, Item } from "@/types/Item";
import { IMachine } from "@/types/Machine";
import { useRMachine } from "@/hook/useR";

const RecipeEdit = () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const addRecipe = useGlobalStore((state) => state.recipeAction.addAsset);
  const items = useGlobalStore((state) => state.item);
  const placeable = useGlobalStore((state) => state.machine.placeable);
  const MapItem2Machine = placeable.reduce((pre, cur) => {
    pre.set(cur.item, cur);
    return pre;
  }, new Map<ItemID, IMachine>());

  const rMachine = useRMachine();
  const getItemByID = useGlobalStore((state) => state.itemAction.getItemByID);
  const [open, setOpen] = useState(false);
  const [pickingProduct, setPicking] = useState(false);
  const [ingredients, setIngredients] = useState<Item[]>([]);
  const [product, setProduct] = useState<Item[]>([]);
  const [manu, setManu] = useState<IMachine | null>(null);

  const submitAddRecipe = () => {
    if (manu) {
      const { name, description, image } = form.getFieldsValue([
        "name",
        "description",
        "image",
      ]);
      addRecipe({
        id: `Recipe_${Math.random().toString(36).substring(2)}`,
        name: name || product[0]?.name || "虚空配方",
        description,
        image: image || product[0].image,
        textIcon: product[0].textIcon,
        ingredients: ingredients.map((i) => ({ items: i.id, num: i.num })),
        products: product.map((i) => ({ items: i.id, num: i.num })),
        manufacturer: manu.id,
      });
      Clear();
      setOpen(false);
    } else {
      message.error("Please select a manufacturer");
    }
  };
  const Clear = () => {
    form.resetFields();
    setManu(null);
    setProduct([]);
    setIngredients([]);
  };
  const removePick = (item: IItem) => {
    let container = pickingProduct ? setProduct : setIngredients;
    container((state) => {
      const exist = state.findIndex((i) => i.id == item.id);
      state[exist].num--;
      if (state[exist].num <= 0) {
        console.log(
          "remove!",
          state.filter((i) => i.id !== state[exist].id)
        );
        return state.filter((i) => i.id !== state[exist].id);
      }
      return [...state];
    });
  };

  const Pick = (item: IItem) => {
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
  const PickManu = (item: IItem) => {
    console.log(item, MapItem2Machine);
    setManu(MapItem2Machine.get(item.id) || null);
  };

  const selfAssetStyle = {
    flexBasis: 0,
    flexGrow: 1,
    backgroundColor: token.colorFillContent,
    borderRadius: 8,
    padding: 12,
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
          <Flex vertical gap={9}>
            <Flex vertical gap={8} style={selfAssetStyle}>
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
              ></Input>
              <ItemGridLayout items={items} onItemClick={Pick} />
            </Flex>
            <Flex vertical gap={8} style={selfAssetStyle}>
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
              ></Input>
              <ItemGridLayout
                items={rMachine.map((i) => i.item)}
                onItemClick={PickManu}
              />
            </Flex>
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
            <Form.Item label="Image" name="image">
              <Input placeholder="input placeholder" disabled />
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
                <ItemGridLayout items={ingredients} onItemClick={removePick} />
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
                <ItemGridLayout items={product} onItemClick={removePick} />
              </div>
            </Form.Item>
            <ItemPreview item={getItemByID(manu?.item)} />
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
