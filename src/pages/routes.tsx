import {
  CloudServerOutlined,
  InsertRowAboveOutlined,
  ProfileOutlined,
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
    value: "/",
    exact: true,
    hide: true,
    name: "首页",
    children: <Redirect to="/dashboard" />,
  },
  {
    value: "/dashboard",
    name: "Dashboard",
    icon: <CloudServerOutlined />,
    component: loader("dashboard"),
  },
  {
    value: "/tables",
    name: "表格",
    icon: <TableOutlined />,
    routes: [
      {
        value: "basic",
        name: "基础表格",
        icon: <InsertRowAboveOutlined />,
        component: loader("tables/basic"),
      },
      {
        value: "list",
        name: "列表",
        icon: <ProfileOutlined />,
        component: loader("tables/list"),
      },
    ],
  },
  {
    hide: true,
    value: "/**",
    component: NotFound,
    name: "404页面未找到",
  },
];
