import React, { Dispatch } from "react";
import {
  IGlobalState,
  IGlobalStateAction,
  useGlobalState,
} from "src/hooks/useGlobalState";
import { createContainer } from "unstated-next";

interface GlobalStateProviderProps {
  value?: Partial<IGlobalState>;
}

/** 全局状态数据类型 */
export const GlobalState = createContainer<
  [IGlobalState, Dispatch<IGlobalStateAction>],
  Partial<IGlobalState>
>(useGlobalState);

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
  value,
}) => {
  return (
    <GlobalState.Provider initialState={value}>{children}</GlobalState.Provider>
  );
};

export default GlobalStateProvider;
