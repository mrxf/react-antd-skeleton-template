import { Layout } from "antd";
import "./App.less";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";
import SiderBar from "../sidebar";
import Header from "../header";
import { QueryParamProvider } from "use-query-params";
import useSWR from "swr";
import { flatRoute } from "src/utils/flatRoutes";
import ContentSkeleton from "src/components/contentSkeleton";
import GlobalStateProvider from "src/components/globalState";
import { getRouteArrayByPath } from "src/utils/getRouteByPath";
import { routeItems } from "src/pages/routes";

const { Content, Header: LayoutHeader } = Layout;

function App() {
  // 在这里获取用户的登录信息
  const { data, isValidating } = useSWR("/antd/userinfo", {
    dedupingInterval: 10 * 60 * 1000, // 用户信息保存10分钟缓存
  });

  return (
    <GlobalStateProvider
      value={{ breadCrumbRoute: getRouteArrayByPath(window.location.pathname) }}
    >
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Layout>
            <LayoutHeader className="topNav">
              <SiderBar routeItems={routeItems} />
            </LayoutHeader>
            <Header />
            <Content className="app-content">
              {isValidating || !data || data.status !== 200 ? ( // 防止未登录之后，打开面板，以做出无意义的请求
                <ContentSkeleton />
              ) : (
                <Suspense fallback={<ContentSkeleton />}>
                  <Switch>
                    {flatRoute(routeItems).map((router) => (
                      <Route {...router} key={router.path as string} />
                    ))}
                  </Switch>
                </Suspense>
              )}
            </Content>
          </Layout>
        </QueryParamProvider>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
