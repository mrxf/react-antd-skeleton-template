import {
  CloudServerOutlined,
  InsertRowAboveOutlined,
  NumberOutlined,
  ProjectOutlined,
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
    path: "/",
    exact: true,
    hide: true,
    name: "首页",
    children: <Redirect to="/dashboard" />,
  },
  {
    value: "/dashboard",
    path: "/dashboard",
    name: "Dashboard",
    icon: <CloudServerOutlined />,
    component: loader("dashboard"),
  },
  {
    value: "/tables",
    path: "/tables",
    name: "表格",
    icon: <TableOutlined />,
    routes: [
      {
        value: "basic",
        name: "基础表格",
        path: "/tables/basic",
        icon: <InsertRowAboveOutlined />,
        component: loader("tables/basic"),
      },
      {
        value: "advance",
        path: "/tables/advance",
        name: "进阶表格",
        icon: <NumberOutlined />,
        component: loader("tables/basic"),
      },
      {
        value: "list",
        path: "/tables/list/:id",
        name: "列表",
        hide: true,
        icon: <ProjectOutlined />,
        component: loader("tables/basic"),
      },
    ],
  },
  {
    hide: true,
    value: "/**",
    path: "/**",
    component: NotFound,
    name: "404页面未找到",
  },
];
