import { pick } from "lodash";
import { RouteProps } from "react-router-dom";
import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import urljoin from "url-join";

/**
 * 拼接路由为路径
 * @param currentPath 当前路由地址
 * @param prefix 前缀
 * @description
 * 如果字符串为 / 开头的绝对路径，则不添加prefix
 * 否则添加prefix
 */
export const concatPath = (
  currentPath: string,
  prefix: string = "/"
): string => {
  const pre = /^\/.*?/gi.test(prefix) ? prefix : "/" + prefix;  // 前缀路由一定要以 / 开头，这里做处理
  let path = urljoin(pre, currentPath);
  if (/^\/.*?/gi.test(currentPath)) {
    path = currentPath;
  }

  return path;
};

/** 从react route dom配置中获取，用于从路由配置Item中pick数据 */
const routePropsKeys = [
  "location",
  "component",
  "render",
  "children",
  "path",
  "exact",
  "sensitive",
  "strict",
];

/**
 * 将嵌套的路由+导航配置数组数据，变为一维的路由配置信息
 * @param routeItems 路由+导航配置数据数组
 * @param prefix 路由配置的前缀
 */
export const flatRoute = (routeItems: IRouteItem[], prefix: string= '/'): RouteProps[] => {
  let flatted: RouteProps[] = [];
  for (let routeItem of routeItems) {
    let routes: RouteProps[] = [];
    /** 根据根据传进来的prefix拼接路由完整地址，尤其是子路由 */
    const path = concatPath(routeItem.value, prefix);
    if (routeItem.routes) {
      // 如果含有子路由，则将子路由一维化正常路由地址
      routes = flatRoute(routeItem.routes, path);
    }
    if (routeItem.component || routeItem.children || routeItem.render) {
      // 如果含有组件/元素，则认为是一个正确的路由配置页面，则添加进入
      const routeData = pick(routeItem, routePropsKeys);
      flatted.push({...routeData, path });
    } else if (!!routes && routes.length > 0) {
      flatted.push(...routes);
    }
  }
  return flatted;
};
