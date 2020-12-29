import { Menu } from "antd";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GlobalState } from "src/components/globalState";
import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import { getMenuItem } from "src/utils/getMenuItem";

const { SubMenu } = Menu;

interface MenuListProps extends RouteComponentProps {
  className?: string;
  routeItems: IRouteItem[];
}

const MenuList: React.FC<MenuListProps> = ({ className, routeItems, history }) => {
  const [, dispatch] = GlobalState.useContainer();

  return (
    <Menu
      theme="dark"
      selectedKeys={[history.location.pathname]}
      mode="horizontal"
      className={className}
    >
      {routeItems.map((menu) => {
        // 隐藏一级侧边栏的情况
        if (menu.hide) {
          return undefined;
        } else if (
          menu.routes &&
          menu.routes.filter((v) => !v.hide).length > 0
        ) {
          return (
            <SubMenu
              key={menu.path}
              title={
                <>
                  {menu.icon}
                  <span className="nav-text">{menu.name}</span>
                </>
              }
            >
              {menu?.routes.map((v) => getMenuItem(v, dispatch))}
            </SubMenu>
          );
        }
        return getMenuItem(menu, dispatch);
      })}
    </Menu>
  );
};

export default withRouter(MenuList);
