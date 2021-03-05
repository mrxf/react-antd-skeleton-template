import { Breadcrumb } from "antd";
import React from "react";

const BreadCrumbShow: React.FC = () => {
  return (
    <div>
      <h2>面包屑</h2>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application List</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
      ,
    </div>
  );
};

export default BreadCrumbShow;
