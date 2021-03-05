import { SearchOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import React from "react";

interface ButtonsProps {}

const Buttons: React.FC<ButtonsProps> = () => {
  return (
    <>
      <h2>按钮</h2>
      <Space>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </Space>
    </>
  );
};

export default Buttons;
