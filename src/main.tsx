import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import MainPage from "@/pages/index.tsx";
import { ConfigProvider } from "antd";

const Root = () => {
  return (
    <React.StrictMode>
      <ConfigProvider
        csp={{ nonce: "YourNonceCode" }}
        theme={{
          token: {
            colorPrimary: "#c88ff9",
            colorInfo: "#c88ff9",
            colorFillQuaternary: "#c88ff905",
            colorFillSecondary: "#c88ff90f",
            colorPrimaryBgHover: "#f1d6ff",
            borderRadius: 0,
          },
          components: {
            Table: {
              rowHoverBg: "#f1d6ff",
            },
          },
        }}
      >
        <MainPage></MainPage>
      </ConfigProvider>
    </React.StrictMode>
  );
};
const container = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(container).render(<Root />);
