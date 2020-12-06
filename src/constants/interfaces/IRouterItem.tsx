import { ReactNode } from "react";
import { RouteProps } from "react-router-dom";

export interface IRouteItem extends RouteProps {
    /** 路由在侧边栏的名称以及打开页面后在title中展示的名称 */
    name: string;
    /**
     * 路由值
     * @example `/user/dashboard`只要前面带有/则不会生成相对路由
     */
    value: string;
    /** icon图标组件 */
    icon?: ReactNode;
    routes?: IRouteItem[];
    /** 是否在侧边栏中展示 */
    hide?: boolean;
    /** 标题中是否展示返回按钮 */
    showBack?: boolean;
}
