import { Breadcrumb } from "antd";
import React from "react";

const BreadCrumbShow: React.FC = () => {
  return (
    <div>
      <h2>面包屑</h2>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>Application Center</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>Application List</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbShow;
