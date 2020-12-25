import { routeItems } from "src/pages/routes";
import { pathToRegexp } from "path-to-regexp";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";


/** 根据pathName信息获取面包屑路由数组 */
export const getRouteArrayByPath = (
  pathname: string = window.location.pathname
): Route[] => {
  const routeArray: Route[] = [{ path: "/", breadcrumbName: "首页" }]; // 自动带上首页
  for (let i = 0; i < routeItems.length; i++) {
    // TODO： 优化代码逻辑
    const currentItem = routeItems[i];
    if (currentItem.path.includes("*")) {
      // 通配符不做匹配
      continue;
    } else if (pathToRegexp(currentItem.path).test(pathname)) {
      routeArray.push({
        breadcrumbName: currentItem.name,
        path: currentItem.path,
      });
    } else {
      if (
        currentItem.routes &&
        currentItem.routes.findIndex((item) =>
          pathToRegexp(item.path).test(pathname)
        ) > -1
      ) {
        routeArray.push({
          breadcrumbName: currentItem.name,
          path: currentItem.path,
        });
        const childItem = currentItem.routes.find((item) =>
          pathToRegexp(item.path).test(pathname)
        );

        routeArray.push({
          breadcrumbName: childItem!.name,
          path: childItem!.path,
        });
      }
    }
  }
  return routeArray;
};
