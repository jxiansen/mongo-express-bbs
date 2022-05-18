const express = require("express");
const app = express();
const morgan = require("morgan");
const indexRouter = require("./routes/indexRoutes"); // 前端页面路由
const apiRouter = require("./routes/apiRoutes");
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const path = require("path");

// 各个依赖包
// 路由文件引入

app.use(express.static("public"));
// 对post请求体做解析
app.use(bodyParser.urlencoded({ extended: false }));
// 请求体用json解析
app.use(bodyParser.json());
// 使用第三方morgan中间件，打印出所有的请求和响应
app.use(morgan("dev"));
/**
 * 静态文件服务
 */
app.use(express.static(`${__dirname}/public`));
/**
 * 页面导航路由
 */
app.use("/", indexRouter); // api路由
/**
 * api路由
 */
app.use("/api", apiRouter);
/**
 * users路由
 */
app.use("/user", userRouter);

/**
 * 404页面
 */
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(process.cwd() + "/views/404.html"));
});

module.exports = app;
