import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, InputRef, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useRef, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useGlobalStore } from "@/store";
import ItemGridLayout from "../Item/ItemGridLayout";
import TechCard from "./TechCard";
import { Iconable } from "../Item/ItemIcon";
import { RandomTechIcon } from "@/util/mock";
import { IRecipe, RecipeID } from "@/types/Recipe";
import { ITechnology, TechnologyID } from "@/types/Tech";
import TechPanel from "./TechPanel";

const TechEdit: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const recipe = useGlobalStore((state) => state.recipe);
  const tech = useGlobalStore((state) => state.technology);
  const addTech = useGlobalStore((state) => state.TechnologyAction.addAsset);
  const [addedRecipe, addRecipe] = useState<IRecipe[]>([]);
  const [addedPrTech, addPrTech] = useState<ITechnology[]>([]);
  const [addedEvent, addEvent] = useState<{ key: string; value: string }[]>([]);
  const eventName = useRef<InputRef>(null);

  const PickRecipe = ({ id }: { id: RecipeID }) => {
    if (addedRecipe.findIndex((i) => i.id === id) !== -1) return;
    addRecipe((state) => [...state, recipe.find((i) => i.id == id)!]);
  };
  const removeRecipe = ({ id }: { id: RecipeID }) => {
    addRecipe((state) => state.filter((i) => i.id !== id));
  };

  const PickTech = ({ id }: { id: TechnologyID }) => {
    console.log(addedPrTech);
    if (addedPrTech.findIndex((i) => i.id === id) !== -1) {
      addPrTech((state) => state.filter((i) => i.id !== id));
    } else {
      addPrTech((state) => [...state, tech.find((i) => i.id == id)!]);
    }
  };

  const submitAddTech = () => {
    const { name, description } = form.getFieldsValue(["name", "description"]);
    addTech({
      id: `Tech_${Math.random().toString(36).substring(2)}`,
      name,
      description,
      image: "",
      textIcon: RandomTechIcon[Math.floor(Math.random() * 12)],
      prerequisites: addedPrTech.map((i) => i.id),
      necessary: addedRecipe.map((i) => i.id),
      event: addedEvent,
      unlockRecipes: [],
    });
    setOpen(false);
    addEvent([]);
    addRecipe([]);
    addPrTech([]);
  };
  const AddEvent = () => {
    const name = form.getFieldValue("eventName");
    if (name !== "" && !addedEvent.map((i) => i.key).includes(name)) {
      addEvent((state) => [
        ...state,
        { key: form.getFieldValue("eventName"), value: "1" },
      ]);
      setTimeout(() => {
        eventName.current!.input!.value = "";
        const value = [...document.querySelectorAll(".event-value")].at(-1);
        (value as HTMLInputElement).focus();
      }, 0);
    } else {
      message.error("Event name can't empty or duplicate");
    }
  };

  return (
    <>
      <Modal
        forceRender
        title="Add Tech"
        open={open}
        onOk={submitAddTech}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Flex gap={8}>
          <Flex vertical gap={8} style={{ flexGrow: 1 }}>
            Prerequisites:
            <Flex gap={8} wrap="wrap">
              {tech.map((i) => (
                <TechCard
                  item={i}
                  key={i.id}
                  onClick={PickTech}
                  size="small"
                  status={addedPrTech.includes(i) ? "Ready" : "Locked"}
                />
              ))}
            </Flex>
            <Flex
              gap={8}
              vertical
              style={{
                flexBasis: 0,
                flexGrow: 2,
                background: "#EEE",
                borderRadius: 12,
                padding: 12,
              }}
            >
              <Input
                placeholder="Search Recipes..."
                prefix={<SearchOutlined />}
              ></Input>
              <ItemGridLayout
                items={recipe as Iconable[]}
                onlyIcon
                onItemClick={PickRecipe}
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
              <Input placeholder="高科技" />
            </Form.Item>
            <Form.Item label="Image" name="image">
              <Input placeholder="not support" disabled max={1} />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea placeholder="研究了没什么用" />
            </Form.Item>
            <Form.Item label="Unlock Recipe" name="unlock">
              <div
                style={{
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.06)",
                  borderRadius: 8,
                  padding: 8,
                  minHeight: 54,
                }}
              >
                <ItemGridLayout
                  items={addedRecipe as Iconable[]}
                  onItemClick={removeRecipe}
                  onlyIcon
                />
              </div>
            </Form.Item>
            {addedEvent.map((event, index) => (
              <Form.Item
                label={`Event ${event.key}`}
                initialValue={event.value}
                key={index}
              >
                <div style={{ display: "flex", gap: 8 }}>
                  <Input placeholder="Dispatch Value" className="event-value" />
                  <Button
                    danger
                    icon={<CloseOutlined />}
                    onClick={() => {
                      addEvent((state) =>
                        state.filter((i) => i.key != event.key)
                      );
                    }}
                  />
                </div>
              </Form.Item>
            ))}
            <Form.Item label="Add Event" name="eventName">
              <div style={{ display: "flex", gap: 8 }}>
                <Input ref={eventName} />
                <Button type="primary" onClick={AddEvent}>
                  Add Event
                </Button>
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
      <TechPanel />
    </>
  );
};

export default TechEdit;
