import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import { pathToRegexp } from "path-to-regexp";

export const getParentByPath = (pathName: string, routeItems: IRouteItem[]) => {
  const parentItem = routeItems.find((item) => {
    if (!item.routes) {
      return false;
    } else {
      return (
        item.routes.findIndex((route) =>
          pathToRegexp(route.path as string).test(pathName)
        ) > -1
      );
    }
  });

  return parentItem;
};
