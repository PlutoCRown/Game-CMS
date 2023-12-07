import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import MainPage from "@/pages/index.tsx";
import { ConfigProvider } from "antd";

const container = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <ConfigProvider csp={{ nonce: "YourNonceCode" }}>
      <MainPage></MainPage>
    </ConfigProvider>
  </React.StrictMode>
);
