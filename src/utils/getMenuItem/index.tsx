import { Menu } from "antd";
import React, { Dispatch } from "react";
import { NavLink } from "react-router-dom";
import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import { IGlobalStateAction } from "src/hooks/useGlobalState";

export const getMenuItem = (
  item: IRouteItem,
  dispatch: Dispatch<IGlobalStateAction>
) => {
  // 隐藏二级侧边栏的情况
  if (item.hide) {
    return undefined;
  }
  return (
    <Menu.Item key={item.path}>
      <NavLink
        onClick={() =>
          // 每次切换侧边栏地址，都全局更新面包屑信息
          dispatch({
            type: "update_route_by_path",
            pathname: item.path,
          })
        }
        to={item.path}
      >
        {item.icon}
        <span className="nav-text">{item.name}</span>
      </NavLink>
    </Menu.Item>
  );
};
