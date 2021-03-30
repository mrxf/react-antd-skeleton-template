const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/antd",
    createProxyMiddleware({
      target: "https://yapi.thisjs.com/mock/11/",
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    "/mock",
    createProxyMiddleware({
      target: "http://127.0.0.1:4001",
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/mock": "/",
      },
    })
  );
};
