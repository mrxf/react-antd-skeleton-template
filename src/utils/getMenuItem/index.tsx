import { Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { IRouteItem } from "src/constants/interfaces/IRouterItem";

export const getMenuItem = (item: IRouteItem) => {
  // 隐藏二级侧边栏的情况
  if (item.hide) {
    return undefined;
  }
  return (
    <Menu.Item key={item.path}>
      <NavLink to={item.path}>
        {item.icon}
        <span className="nav-text">{item.name}</span>
      </NavLink>
    </Menu.Item>
  );
};
