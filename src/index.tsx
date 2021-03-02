import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import { SWRConfig } from "swr";
import "./index.css";
import App from "./layout/app/App";
import reportWebVitals from "./reportWebVitals";
import { http } from "./utils/http";
import zhCN from "antd/lib/locale/zh_CN";
import { UseRequestProvider } from "ahooks";
import GlobalStateProvider from "./components/globalState";
import { getRouteArrayByPath } from "./utils/getRouteByPath";

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: http,
        revalidateOnFocus: false,
      }}
    >
      <UseRequestProvider
        value={{
          requestMethod: http,
        }}
      >
        <ConfigProvider locale={zhCN} prefixCls="ksyun">
          <GlobalStateProvider
            value={{
              breadCrumbRoute: getRouteArrayByPath(window.location.pathname),
            }}
          >
            <App />
          </GlobalStateProvider>
        </ConfigProvider>
      </UseRequestProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
