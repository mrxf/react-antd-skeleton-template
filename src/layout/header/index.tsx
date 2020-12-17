import React from "react";
import UserInfo from "src/components/userInfo";
import HeadBreadcrumb from "../headBreadcrumb";
import styles from "./index.module.less";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className={styles.header}>
      <HeadBreadcrumb />
      <UserInfo theme="light"/>
    </div>
  );
};

export default Header;
