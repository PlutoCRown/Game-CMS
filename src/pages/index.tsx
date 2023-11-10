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
import { Breadcrumb, Layout, Menu, theme } from "antd";
import TechEdit from "./Tech/TechEdit";
import ItemEdit from "./Item/ItemEdit";

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
  const [route, setRoute] = useState<string[]>([]);
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
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
          onClick={(e) => setRoute(e.keyPath)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 22, background: colorBgContainer }}>
          <Breadcrumb
            items={[
              {
                title: route[1]
                  ? menuItems.find((i) => i?.key == route[1])?.label
                  : "",
              },
              {
                title:
                  route.length >= 2
                    ? menuItems
                        .find((i) => i?.key == route[1])
                        ?.children?.find((i) => i?.key == route[0])?.label
                    : "",
              },
            ]}
          ></Breadcrumb>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <TechEdit />
          </div>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <ItemEdit />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Meow!</Footer>
      </Layout>
    </Layout>
  );
};

export default Index;
