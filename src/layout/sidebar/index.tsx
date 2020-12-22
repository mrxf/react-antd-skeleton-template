import React, { useState } from "react";
import { Layout, Menu } from "antd";
import style from "./index.module.less";
import useSWR from "swr";
import MenuSkeleton from "./components/menuSkeleton";
import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { getParentByPath } from "src/utils/getParentByPath";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SiderBarProps extends RouteComponentProps {
  routeItems: IRouteItem[];
}

const getItem = (item: IRouteItem, prefix = "/") => {
  // 两种隐藏二级侧边栏的情况
  if (item.hide) {
    return undefined;
  }
  return (
    <Menu.Item key={item.path as string}>
      <NavLink to={item.path as string}>
        {item.icon}
        <span className="nav-text">{item.name}</span>
      </NavLink>
    </Menu.Item>
  );
};

const SiderBar: React.FC<SiderBarProps> = ({ routeItems, history }) => {
  const { isValidating: isLogin } = useSWR("/antd/userinfo");
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { pathname } = history.location;
  const parentItem = getParentByPath(pathname, routeItems);

  return (
    <Sider
      className={`${style.side} full-skeleton`}
      width={255}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <div className={style.logo}>
        {!collapsed ? <h1>{process.env.REACT_APP_SITE_NAME}</h1> : undefined}
      </div>
      {isLogin ? (
        <MenuSkeleton />
      ) : (
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[(parentItem?.path as string | undefined) ?? ""]}
          mode="inline"
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
                  key={menu.path as string}
                  title={
                    <>
                      {menu.icon}
                      <span className="nav-text">{menu.name}</span>
                    </>
                  }
                >
                  {menu?.routes.map((v) => getItem(v))}
                </SubMenu>
              );
            }
            return getItem(menu);
          })}
        </Menu>
      )}
    </Sider>
  );
};

export default withRouter(SiderBar);
