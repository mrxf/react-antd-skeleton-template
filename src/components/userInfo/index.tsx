import { DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, Modal, Skeleton } from "antd";
import classNames from "classnames";
import { get } from "lodash";
import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import style from "./index.module.less";

interface UserInfoProps {
  theme?: "light" | "dark";
}

const UserInfo: React.FC<UserInfoProps> = ({ theme = "dark" }) => {
  const { isValidating: isLogin, data: userData } = useSWR("/antd/userinfo");

  // 展示关于信息
  const onShowAbout = useCallback(() => {
    Modal.info({
      title: `版本 v${process.env.REACT_APP_VERSION}`,
      content: (
        <div>
          <p>
            技术交流地址：
            <a target="_blank" rel="noreferrer" href="https://www.thisjs.com/">
              https://www.thisjs.com/
            </a>
          </p>
        </div>
      ),
    });
  }, []);

  // 下拉菜单组件
  const infoMenus = useMemo(
    () => (
      <Menu>
        <Menu.Item>
          <Button type="link">退出</Button>
        </Menu.Item>
        <Menu.Item onClick={onShowAbout}>
          <Button type="link">关于</Button>
        </Menu.Item>
      </Menu>
    ),
    [onShowAbout]
  );

  // 用户名组件
  const userNameComponent = useMemo(() => {
    if (isLogin) {
      // 登录的骨架屏
      return (
        <div className={style.userInfoSkeleton}>
          <Skeleton.Avatar active />
          <Skeleton.Button style={{ width: 150 }} active />
        </div>
      );
    } else {
      return (
        <Dropdown overlay={infoMenus}>
          <div
            className={classNames(style.username, {
              [style.__dark]: theme === "dark",
              [style.__light]: theme === "light",
            })}
          >
            <Avatar
              src={get(userData, "data.data.avatar")}
              size="small"
              className="mr-16"
            />
            欢迎您，{get(userData, "data.data.username")}
            <DownOutlined style={{ marginLeft: 8 }} />
          </div>
        </Dropdown>
      );
    }
  }, [isLogin, userData, infoMenus]);
  return userNameComponent;
};

export default UserInfo;
