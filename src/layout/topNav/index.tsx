import React from "react";
import style from "./index.module.less";
import useSWR from "swr";
import MenuSkeleton from "./components/menuSkeleton";
import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import UserInfo from "src/components/userInfo";
import MenuList from "../menuList";
import classNames from "classnames";
import { GlobalState } from "src/components/globalState";
interface TopNavProps extends RouteComponentProps {
  routeItems: IRouteItem[];
}

const TopNav: React.FC<TopNavProps> = ({ routeItems, history }) => {
  const { isValidating: isLogin } = useSWR("/antd/userinfo");
  const [globaleState] = GlobalState.useContainer();

  return (
    <div className={style.topNav}>
      <div
        className={classNames(style.logo, {
          [style.themeLight]: globaleState.theme === "light",
          [style.themeDark]: globaleState.theme === "dark",
        })}
      >
        <Link to="/">
          <h1>{process.env.REACT_APP_SITE_NAME}</h1>
        </Link>
      </div>
      {isLogin ? (
        <MenuSkeleton />
      ) : (
        <MenuList routeItems={routeItems} className={style.menus} />
      )}
      <div className={style.userInfo}>
        <UserInfo />
      </div>
    </div>
  );
};

export default withRouter(TopNav);
