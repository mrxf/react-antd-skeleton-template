import { ReactNode } from "react";
import { RouteProps } from "react-router-dom";

export interface IRouteItem extends RouteProps {
    /** 路由在侧边栏的名称以及打开页面后在title中展示的名称 */
    name: string;
    /** 路由地址 */
    path: string;
    /** icon图标组件 */
    icon?: ReactNode;
    /**子路由信息，子路由配置信息不允许带有子路由 */
    routes?: Omit<IRouteItem, "routes">[];
    /** 是否在侧边栏中展示 */
    hide?: boolean;
    /** 标题中是否展示返回按钮 */
    showBack?: boolean;
}
