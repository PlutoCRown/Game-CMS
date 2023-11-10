import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import MainPage from "@/pages/index.tsx";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider csp={{ nonce: "YourNonceCode" }}>
      <MainPage></MainPage>
    </ConfigProvider>
  </React.StrictMode>
);
