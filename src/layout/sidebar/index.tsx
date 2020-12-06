import React from "react";
import { Menu } from "antd";
import style from "./index.module.less";
import useSWR from "swr";
import MenuSkeleton from "./components/menuSkeleton";
import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import UserInfo from "src/components/userInfo";
import { GlobalState } from "src/components/globalState";
import { concatPath } from "src/utils/flatRoutes";

const { SubMenu } = Menu;

interface SiderBarProps extends RouteComponentProps {
  routeItems: IRouteItem[];
}

const SiderBar: React.FC<SiderBarProps> = ({ routeItems, history }) => {
  const { isValidating: isLogin } = useSWR("/userinfo");

  const [, dispatch] = GlobalState.useContainer();

  const getItem = (item: IRouteItem, prefix = "/") => {
    // 两种隐藏二级侧边栏的情况
    if (item.hide) {
      return undefined;
    }
    const path = concatPath(item.value, prefix);
    return (
      <Menu.Item key={path}>
        <NavLink
          onClick={() =>
            // 每次切换侧边栏地址，都全局更新面包屑信息
            dispatch({ type: "update_route_by_path", pathname: path })
          }
          to={path}
        >
          {item.icon}
          <span className="nav-text">{item.name}</span>
        </NavLink>
      </Menu.Item>
    );
  };
  return (
    <div className={style.topNav}>
      <div className={style.logo}>
        <h1>{process.env.REACT_APP_SITE_NAME}</h1>
      </div>
      {isLogin ? (
        <MenuSkeleton />
      ) : (
        <Menu
          theme="dark"
          selectedKeys={[history.location.pathname]}
          mode="horizontal"
          className={style.menus}
        >
          {routeItems.map((menu) => {
            // 两种隐藏一级侧边栏的情况
            if (menu.hide) {
              return undefined;
            } else if (
              menu.routes &&
              menu.routes.filter((v) => !v.hide).length > 0
            ) {
              return (
                <SubMenu
                  key={menu.value}
                  title={
                    <>
                      {menu.icon}
                      <span className="nav-text">{menu.name}</span>
                    </>
                  }
                >
                  {menu?.routes.map((v) => getItem(v, menu.value))}
                </SubMenu>
              );
            }
            return getItem(menu);
          })}
        </Menu>
      )}
      <div className={style.userInfo}>
        <UserInfo />
      </div>
    </div>
  );
};

export default withRouter(SiderBar);
