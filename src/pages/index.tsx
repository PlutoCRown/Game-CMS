import React, { useState } from "react";
import {
  AppstoreOutlined,
  BlockOutlined,
  BookOutlined,
  BranchesOutlined,
  BuildOutlined,
  BulbOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  FormOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Flex, Layout, Menu, Space, theme } from "antd";
import ItemEdit from "./Item/ItemEdit";
import Nothing from "./Nothing";
import TechEdit from "./Tech/TechEdit";
import RecipeEdit from "./Recipe/RecipeEdit";
import MachinePage from "./Machine/MachinePage";

const { Header, Content, Footer, Sider } = Layout;

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: any[]
) => ({
  key,
  icon,
  children,
  label,
});

const menuItems = [
  getItem("操作", "Play", <PlayCircleOutlined />, [
    getItem("Explore", "1", <RadarChartOutlined />),
    getItem("Inventory", "2", <DatabaseOutlined />),
    getItem("Research", "3", <BulbOutlined />),
    getItem("Manufacture", "4", <BranchesOutlined />),
    getItem("Building", "5", <BuildOutlined />),
  ]),
  getItem("编辑", "Edit", <FormOutlined />, [
    getItem("Sence", "6", <PictureOutlined />),
    getItem("Item", "7", <AppstoreOutlined />),
    getItem("Technology", "8", <ExperimentOutlined />),
    getItem("Recipes", "9", <BookOutlined />),
    getItem("Machine", "10", <BlockOutlined />),
  ]),
];

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [route, setRoute] = useState<string[]>(["7", "Edit"]);
  const bi = ((i) => [
    { title: i?.label },
    { title: i?.children?.find((i) => i?.key == route[0]).label },
  ])(menuItems.find((i) => i?.key == route[1]));

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          defaultOpenKeys={["Edit"]}
          defaultSelectedKeys={["6"]}
          mode="inline"
          items={menuItems}
          onClick={(e) => setRoute(e.keyPath)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 22, background: colorBgContainer }}>
          <Breadcrumb style={{ fontWeight: "bold" }} items={bi}></Breadcrumb>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {
              {
                "1": <Nothing />,
                "2": <Nothing />,
                "3": <Nothing />,
                "4": <Nothing />,
                "5": <Nothing />,
                "6": <Nothing />,
                "7": <ItemEdit />,
                "8": <TechEdit />,
                "9": <RecipeEdit />,
                "10": <MachinePage />,
              }[route[0]]
            }
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Meow!</Footer>
      </Layout>
    </Layout>
  );
};

export default Index;
