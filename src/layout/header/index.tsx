import { Skeleton, Breadcrumb } from "antd";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import React from "react";
import { GlobalState } from "src/components/globalState";
import useSWR from "swr";

interface HeaderProps {}

const routes = [
  {
    path: "/",
    breadcrumbName: "首页",
  },
  {
    path: "/ern-manage",
    breadcrumbName: "CDN管理",
  },
  {
    path: "/customer-manage",
    breadcrumbName: "用户管理",
  },
];

const Header: React.FC<HeaderProps> = () => {
  const { isValidating: isLogin } = useSWR("/userinfo");
  const [globaleState] = GlobalState.useContainer();

  /** 面包屑生成工具 */
  const routeItemRender = (
    route: Route,
    params: any,
    routes: Array<Route>,
    paths: string[]
  ) => {
    if (isLogin) {
      // 登录中返回骨架
      return <Skeleton.Button active size="small" />;
    }
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <b>{route.breadcrumbName}</b>
    ) : (
      <span>{route.breadcrumbName}</span> // 后台界面没什么好跳转的，因此只作为展示
    );
  };

  return (
    <Breadcrumb
      className="mt-16 ml-16"
      routes={globaleState.breadCrumbRoute ?? routes}
      itemRender={routeItemRender}
    />
  );
};

export default Header;
