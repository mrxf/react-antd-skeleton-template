import { Skeleton } from "antd";
import React from "react";
import style from "./menuSkeleton.module.less";

interface MenuSkeletonProps {}

const MenuSkeleton: React.FC<MenuSkeletonProps> = () => {
  return (
    <div className={style.menuSkeleton}>
      <Skeleton.Button active size="large" />
      <Skeleton.Button active size="default" />
      <Skeleton.Button active size="large" />
      <Skeleton.Button active size="default" />
      <Skeleton.Button active size="default" />
    </div>
  );
};

export default MenuSkeleton;
