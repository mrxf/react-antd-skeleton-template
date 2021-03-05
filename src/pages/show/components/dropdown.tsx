import { Button, Dropdown, Menu, Space } from "antd";
import React from "react";

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.ksyun.com">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://console.ksyun.com"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://uss.ksyun.com">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const DropDownShow: React.FC = () => {
  return (
    <div>
      <h2>Dropdown</h2>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button>bottomLeft</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>bottomCenter</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button>bottomRight</Button>
          </Dropdown>
        </Space>
        <Space wrap>
          <Dropdown overlay={menu} placement="topLeft">
            <Button>topLeft</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="topCenter">
            <Button>topCenter</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="topRight">
            <Button>topRight</Button>
          </Dropdown>
        </Space>
      </Space>
    </div>
  );
};

export default DropDownShow;
