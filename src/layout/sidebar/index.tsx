import React, { useState } from "react";
import { Layout, Menu } from "antd";
import style from "./index.module.less";
import useSWR from "swr";
import MenuSkeleton from "./components/menuSkeleton";
import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { GlobalState } from "src/components/globalState";
import { getParentByPath } from "src/utils/getParentByPath";
import { getMenuItem } from "src/utils/getMenuItem";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SiderBarProps extends RouteComponentProps {
  routeItems: IRouteItem[];
}

const SiderBar: React.FC<SiderBarProps> = ({ routeItems, history }) => {
  const { isValidating: isLogin } = useSWR("/antd/userinfo");
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [, dispatch] = GlobalState.useContainer();
  const { pathname } = history.location;
  const parentItem = getParentByPath(pathname, routeItems);

  return (
    <Sider
      className={`${style.side} full-skeleton`}
      width={235}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <div className={style.logo}>
        {!collapsed ? (
          <Link to="/">
            <h1>{process.env.REACT_APP_SITE_NAME}</h1>
          </Link>
        ) : undefined}
      </div>
      {isLogin ? (
        <MenuSkeleton />
      ) : (
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[parentItem?.path ?? ""]}
          mode="inline"
        >
          {routeItems.map((menu) => {
            // 隐藏一级侧边栏的情况
            if (menu.hide) {
              return undefined;
            } else if (
              menu.routes &&
              // 子目录中至少有一个是展示的
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
      )}
    </Sider>
  );
};

export default withRouter(SiderBar);
