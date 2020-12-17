import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import { Reducer, useReducer } from "react";
import { getRouteArrayByPath } from "src/utils/getRouteByPath";

/** 页面布局类型 */
export type LayoutMod = "LEFT_RIGHT" | "TOP_BOTTOM"; // "TOP_BOTTOM"-上下结构  "LEFT_RIGHT"-左右结构
export interface IGlobalState {
  title: string; // 全局当前的标题
  breadCrumbRoute: Route[]; // 当前面包屑的路由信息
  layoutMod: LayoutMod; // 全局布局样式
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
  | {
      /** 使用pathname地址更新路由信息 */
      type: "update_route_by_path";
      pathname: string;
    }
  | {
      /** 更新页面布局模式 */
      type: "update_layout";
      value: LayoutMod;
    };

const layoutStorageKey = "LAYOUT_MOD";

const reducer: Reducer<IGlobalState, IGlobalStateAction> = (state, action) => {
  switch (action.type) {
    case "update_title":
      return { ...state, title: action.value };
    case "update_route":
      return { ...state, breadCrumbRoute: action.value };
    case "update_route_by_path":
      const breadRoutes = getRouteArrayByPath(action.pathname);
      return { ...state, breadCrumbRoute: breadRoutes };
    case "update_layout":
      // 更新layout的时候，将数据存储到Storage中，以便下次使用
      localStorage.setItem(layoutStorageKey, action.value);
      return { ...state, layoutMod: action.value }
    default:
      return state;
  }
};

/** 全部可用layoutMods */
export const layoutMods: LayoutMod[] = ["LEFT_RIGHT", "TOP_BOTTOM"];

/** 初始全局数据 */
export const initValue: IGlobalState = {
  title: "",
  breadCrumbRoute: [],
  layoutMod: layoutMods.includes(
    localStorage.getItem(layoutStorageKey) as LayoutMod
  )
    ? (localStorage.getItem(layoutStorageKey) as LayoutMod)
    : "TOP_BOTTOM", // 从本地存储中获取布局模式，默认使用上下结构
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
