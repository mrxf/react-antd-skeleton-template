import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import style from "./index.module.less";
import useSWR from "swr";
import MenuSkeleton from "./components/menuSkeleton";
import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { GlobalState } from "src/components/globalState";
import { getParentByPath } from "src/utils/getParentByPath";
import { getMenuItem } from "src/utils/getMenuItem";
import classNames from "classnames";

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
  const [openKeys, setOpenKeys] = useState<string[]>([]); // 展开的列表
  const [globaleState] = GlobalState.useContainer();

  useEffect(() => {
    // 路径更新时，同时更新展开的二级目录
    const parentItem = getParentByPath(pathname, routeItems);
    const parentKeys = parentItem ? [parentItem.path] : [];
    // 更新展开时，将之前展开的路径也一并合并进来，防止出现只展开一个的情况
    // 使用去重的目的是，防止出现重复展开路径的情况，导致折叠起来的时候，需要两次的情况
    setOpenKeys((prevKeys) => Array.from(new Set(prevKeys.concat(parentKeys))));
  }, [pathname, routeItems]);

  useEffect(() => {
    // pathname改变时，自动更新面包屑路由信息
    dispatch({ type: "update_route_by_path", pathname });
  }, [pathname, dispatch]);

  return (
    <Sider
      className={`${style.side} full-skeleton`}
      width={235}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      theme={ globaleState.theme }
    >
      <div
        className={classNames(style.logo, {
          [style.themeLight]: globaleState.theme === "light",
          [style.themeDark]: globaleState.theme === "dark",
        })}
      >
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
          theme={ globaleState.theme }
          selectedKeys={[pathname]}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys as string[])}
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
                  {menu?.routes.map((v) => getMenuItem(v))}
                </SubMenu>
              );
            }
            return getMenuItem(menu);
          })}
        </Menu>
      )}
    </Sider>
  );
};

export default withRouter(SiderBar);
