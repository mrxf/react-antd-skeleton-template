import {
  CloudServerOutlined,
  InsertRowAboveOutlined,
  TableOutlined,
} from "@ant-design/icons";
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import NotFound from "./exceptions/notFound";

/**
 * 异步加载工具
 * 带有webpack打包名
 */
const loader = (path: string) =>
  lazy(() => import(/* webpackChunkName: '[request]-[index]' */ `./${path}`));

export const routeItems: IRouteItem[] = [
  {
    path: "/",
    exact: true,
    hide: true,
    name: "首页",
    children: <Redirect to="/tables/basic" />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <CloudServerOutlined />,
    component: loader("dashboard"),
  },
  {
    path: "/show",
    name: "组件展示",
    icon: <CloudServerOutlined />,
    component: loader("show"),
  },
  {
    path: "/tables",
    name: "表格",
    icon: <TableOutlined />,
    routes: [
      {
        name: "基础表格",
        path: "/tables/basic",
        icon: <InsertRowAboveOutlined />,
        component: loader("tables/basic"),
      },
    ],
  },
  {
    hide: true,
    path: "/**",
    component: NotFound,
    name: "404页面未找到",
  },
];
