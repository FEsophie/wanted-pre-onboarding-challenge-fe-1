const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/users", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
