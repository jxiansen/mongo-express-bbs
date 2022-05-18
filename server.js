const app = require("./app");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// const test = require("./app/models/users");
/**
 * 监听服务端口
 */
function listen() {
  console.log(`数据库成功连接`);
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
}
console.log(process.env.PORT);
connect();
// 数据库连接
function connect() {
  mongoose.connection
    .on("err", console.log)
    .on("disconnected", connect)
    .on("open", listen); // 数据库连接成功后,开启express服务
  return mongoose.connect(process.env.MONGO_URI);
}
