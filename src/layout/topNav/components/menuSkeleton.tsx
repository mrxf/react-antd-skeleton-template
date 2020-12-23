import { Skeleton } from "antd";
import React from "react";
import { routeItems } from "src/pages/routes";
import style from "./menuSkeleton.module.less";

interface MenuSkeletonProps {}

const MenuSkeleton: React.FC<MenuSkeletonProps> = () => {
  return (
    <div className={style.menuSkeleton}>
      {routeItems
        .filter((item) => !item.path.includes("*") && !item.hide) // 非通配符和非隐藏的路由的数量展示对应的骨架
        .map((item) => (
          <Skeleton.Button key={item.path} active size="default" />
        ))}
    </div>
  );
};

export default MenuSkeleton;
