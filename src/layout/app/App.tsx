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

const { Content, Header: LayoutHeader } = Layout;

type LayoutMod = "LEFT_RIGHT" | "TOP_BOTTOM"; // "TOP_BOTTOM"-上下结构  "LEFT_RIGHT"-左右结构

function App() {
  // 在这里获取用户的登录信息
  const { data, isValidating } = useSWR("/antd/userinfo", {
    dedupingInterval: 10 * 60 * 1000, // 用户信息保存10分钟缓存
  });

  const navMod: LayoutMod = "LEFT_RIGHT";

  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Layout className="app-container ">
          {navMod === "LEFT_RIGHT" ? (
            <LayoutHeader className="topNav">
              <TopNav routeItems={routeItems} />
            </LayoutHeader>
          ) : (
            <SiderBar routeItems={routeItems} />
          )}
          <Layout>
            {navMod === "LEFT_RIGHT" ? <HeadBreadcrumb /> : <Header />}
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
