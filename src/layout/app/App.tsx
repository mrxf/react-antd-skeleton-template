import { Layout } from "antd";
import "./App.less";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";
import TopNav from "../topNav";
import SiderBar from "../sidebar";
import HeadBreadcrumb from "../headBreadcrumb";
import { QueryParamProvider } from "use-query-params";
import useSWR from "swr";
import { flatRoute } from "src/utils/flatRoutes";
import ContentSkeleton from "src/components/contentSkeleton";
import { routeItems } from "src/pages/routes";
import Header from "../header";
import { GlobalState } from "src/components/globalState";

const { Content, Header: LayoutHeader } = Layout;

function App() {
  // 在这里获取用户的登录信息
  const { data, isValidating } = useSWR("/antd/userinfo", {
    dedupingInterval: 10 * 60 * 1000, // 用户信息保存10分钟缓存
  });

  const [globaleState] = GlobalState.useContainer();

  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Layout className="app-container ">
          {globaleState.layoutMod === "TOP_BOTTOM" ? (
            // 上下结构
            <LayoutHeader className="topNav">
              <TopNav routeItems={routeItems} />
            </LayoutHeader>
          ) : (
            <SiderBar routeItems={routeItems} />
          )}
          <Layout>
            {globaleState.layoutMod === "TOP_BOTTOM" ? (
              // 上下结构时只有面包屑
              <HeadBreadcrumb />
            ) : (
              <Header />
            )}
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
        </Layout>
      </QueryParamProvider>
    </Router>
  );
}

export default App;
