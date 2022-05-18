/**
 * 所有的页面显示路由
 */
const express = require("express");
const router = express.Router();
const path = require("path");
const cwd = process.cwd();
/**
 * 首页路由
 */
router.get("/", (req, res) => {
  res.sendFile(path.join(cwd + "/views/index.html"));
});
/**
 * 注册页路由
 */
router.get("/register", (req, res) => {
  res.sendFile(path.join(cwd + "/views/register.html"));
});
/**
 * 登录页面
 */
router.get("/login", (req, res) => {
  res.sendFile(path.join(cwd + "/views/login.html"));
});

module.exports = router;
