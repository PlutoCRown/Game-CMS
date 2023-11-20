import { Button, Flex, Form, Input, Modal, Radio, Select, theme } from "antd";
import { useState } from "react";
import {
  CloseOutlined,
  CloseSquareOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useGlobalStore } from "@/store";
import ItemGridLayout from "../Item/ItemGridLayout";
import ItemPreview from "../Item/ItemPreview";
import PlaceableList from "./PlaceableList";
import { IItem } from "@/types/Item";

const PlaceableEdit = () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const [open, setOpen] = useState(false);
  const items = useGlobalStore((state) => state.item);
  const [placeItem, setPlace] = useState<IItem | null>(null);
  const [fixedSlot, setFixedSlot] = useState(false);
  const [slotSet, setSlot] = useState<{ id: number; type: string }[]>([]);
  const [fuelType, setFuel] = useState<"N" | "E" | "M">("N");
  const addPlaceable = useGlobalStore(
    (state) => state.machineAction.addPlaceable
  );

  const submitAddRecipe = () => {
    const { EntitySprite, fuel } = form.getFieldsValue([
      "EntitySprite",
      "fuel",
    ]);
    if (placeItem !== null) {
      addPlaceable({
        id: `Item_${Math.random().toString(36).substring(2)}`,
        name: placeItem.name,
        image: EntitySprite || placeItem.image,
        item: placeItem.id,
        textIcon: placeItem.textIcon,
        fuelType: fuelType,
        fuelValue: fuel,
        slotType: fixedSlot ? "fixed" : "free",
      });
      form.resetFields();
      setOpen(false);
    }
  };

  return (
    <>
      <Modal
        forceRender
        title="Make Placeables"
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
            <ItemPreview item={placeItem} />
            <Input placeholder="Search..." prefix={<SearchOutlined />}></Input>
            <ItemGridLayout items={items} onItemClick={setPlace} />
          </Flex>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            form={form}
            style={{ flexBasis: 0, flexGrow: 2 }}
          >
            <Form.Item label="EntitySprite" name="EntitySprite">
              <Input placeholder="Texture" max={1} disabled />
            </Form.Item>
            <Form.Item label="Energy type" name="fuelType" initialValue="N">
              <Radio.Group onChange={(v) => setFuel(v.target.value)}>
                <Radio value="N">None</Radio>
                <Radio value="E">Electron</Radio>
                <Radio value="M">Magic</Radio>
              </Radio.Group>
            </Form.Item>
            {fuelType !== "N" && (
              <Form.Item label="Energy Value" name="fuel" initialValue={0}>
                <Input type="number" />
              </Form.Item>
            )}
            <Form.Item label="UI type" name="ui" initialValue={false}>
              <Radio.Group onChange={(v) => setFixedSlot(v.target.value)}>
                <Radio value={true} disabled>
                  固定结构
                </Radio>
                <Radio value={false}>可变输入</Radio>
              </Radio.Group>
            </Form.Item>
            {fixedSlot && (
              <>
                {slotSet.map((i) => (
                  <Form.Item
                    label={`插槽 ${i.id}`}
                    name="ui"
                    initialValue={i.type}
                    key={i.id}
                  >
                    <div style={{ display: "flex", gap: 8 }}>
                      <Select
                        showSearch
                        placeholder="Select a Attr"
                        optionFilterProp="children"
                        options={[
                          {
                            value: "Fuel",
                            label: "Fuel",
                          },
                          {
                            value: "Food",
                            label: "Food",
                          },
                          {
                            value: "all",
                            label: "Unconstrained",
                          },
                        ]}
                      />
                      <Button
                        icon={<CloseOutlined />}
                        danger
                        onClick={() =>
                          setSlot((state) =>
                            state.filter((slot) => slot.id !== i.id)
                          )
                        }
                      ></Button>
                    </div>
                  </Form.Item>
                ))}
                <Button
                  onClick={() =>
                    setSlot((state) => [
                      ...state,
                      { id: state.length + 1, type: "all" },
                    ])
                  }
                >
                  Add Slot
                </Button>
              </>
            )}
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
      <PlaceableList />
    </>
  );
};

export default PlaceableEdit;
