import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import { routeItems } from "src/pages/routes";
import { pathToRegexp } from "path-to-regexp";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";

const getRouteConfigByPath = (
  path?: string,
  routes: IRouteItem[] = routeItems
): IRouteItem | undefined => {
  if (!path) {
    return undefined;
  } else {
    // 使用将path转换为正则匹配主要目的是处理 path/:id 之类的路由
    for (let i = 0; i < routes.length; i++) {
      // 通配符不做匹配
      if (routes[i].path.includes("*")) {
        continue;
      }
      let regPath = path;
      // 因为传入的地址的/作为split符号被去除了，所以可能导致无法匹配，因此做一个添加
      if (routes[i].path.startsWith("/") && !regPath.startsWith("/")) {
        regPath = "/" + regPath;
      }
      if (pathToRegexp(routes[i].path).test(regPath)) {
        return routes[i];
      }
    }
  }
};

/** 根据pathName信息获取路由数组 */
export const getRouteArrayByPath = (
  pathname: string = window.location.pathname
): Route[] => {
  const routeArray: Route[] = [{ path: "/", breadcrumbName: "首页" }]; // 自动带上首页
  for (let i = 0; i < routeItems.length; i++) {
    // TODO： 处理面包屑数组生成
  }
  return routeArray;
};
