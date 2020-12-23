import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import { pathToRegexp } from "path-to-regexp";

/**
 * 根据路径信息，获取父级组件的内容
 * @param pathName 路径名称
 * @param routeItems 路由配置数组
 */
export const getParentByPath = (pathName: string, routeItems: IRouteItem[]) => {
  const parentItem = routeItems.find((item) => {
    if (!item.routes) {
      return false;
    } else {
      return (
        item.routes.findIndex((route) =>
          pathToRegexp(route.path).test(pathName)
        ) > -1
      );
    }
  });

  return parentItem;
};
