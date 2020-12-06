import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import { Reducer, useReducer } from "react";
import { getRouteArrayByPath } from "src/utils/getRouteByPath";

export interface IGlobalState {
  title: string; // 全局当前的标题
  breadCrumbRoute: Route[]; // 当前面包屑的路由信息
}

export type IGlobalStateAction =
  | {
      type: "update_title";
      value: string;
    }
  | {
      type: "update_route";
      value: Route[];
    }
  |{
    /** 使用pathname地址更新路由信息 */
    type: "update_route_by_path";
    pathname: string;
  };

const reducer: Reducer<IGlobalState, IGlobalStateAction> = (state, action) => {
  switch (action.type) {
    case "update_title":
      return { ...state, title: action.value };
    case "update_route":
      return { ...state, breadCrumbRoute: action.value };
    case "update_route_by_path":
      const breadRoutes = getRouteArrayByPath(action.pathname);
      return { ...state, breadCrumbRoute: breadRoutes }
    default:
      return state;
  }
};

/** 初始全局数据 */
export const initValue: IGlobalState = {
  title: "",
  breadCrumbRoute: [],
};

/**
 * 初始化函数
 */
const init = (initState?: Partial<IGlobalState>): IGlobalState => {
  if (!initState) {
    return initValue;
  } else {
    return { ...initValue, ...initState };
  }
};

/**
 * 全局状态管理
 */
export const useGlobalState = (initState?: Partial<IGlobalState>) => {
  const globalReducer = useReducer(reducer, initState, init);

  return globalReducer;
};
