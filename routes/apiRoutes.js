/**
 * 所有的api路由,地址都在localhost:port/api/...
 */
const express = require("express");
const router = express.Router();
const path = require("path");
const svgCaptcha = require("svg-captcha");
const fs = require("fs");
const md5 = require("md5");
const _ = require("lodash");

// router
//   .route("/:id")
//   .get((req, res, next) => {
//     console.log("hi");
//   })
//   .post /**中间件函数 */
//   /**middleWareFunction */
//   ();

/**
 * 向同一个api接口发送post/get请求,req.query:来解析查询参数
 * app.route(path).get(handler).post(handler)
 * 根据查询URL，返回查询参数
 * 访问/name?first=jing&last=feng,返回{name	"firstname lastname"}
 */
router
  .get("/name", (req, res, next) => {
    const { first: firstName, last: lastName } = req.query;
    res.json({
      name: `${firstName} ${lastName}`,
    });
    next();
  })
  .post((req, res, next) => {
    const string = req.body.first + " " + req.body.last;
    res.json({ name: string });
    next();
  });
/**
 * 返回请求接收到时的事件
 */
router.get("/now", (req, res, next) => {
  res.json({ time: new Date().toString() });
});
// /**
//  * 访问/apple/echo,返回相应的单词
//  */
// router.get("/:word/echo", (req, res) => {
//   const { word } = req.params;
//   res.json({
//     echo: word,
//   });
// });
// /**
//  * 接收用户所有的注册信息,包括用户名,邮箱,密码
//  */
// router.post("/register", (req, res) => {
//   const userObj = _.pick(req.body, ["username", "email", "password"]);
//   console.log(userObj);
//   res.json({ hi: 12 });
// });

/**
 * 登录的post接口
 */
router.post("/login", (req, res) => {
  console.log(req.body);
  // const targetObj = {
  //   username: req.body.username,
  //   password: md5(req.body.password),
  // };
  // if (utils.hasUserInfo(targetObj)) {
  //   res.end("login scuscess");
  // } else {
  //   res.end("username or password incorrect");
  // }
});

/**
 * 返回验证码 SVG
 */
router.get("/svg", function (req, res) {
  var captcha = svgCaptcha.create({
    color: true,
    noise: 5,
  });
  res.type("svg").status(200).end(captcha.data);
});
module.exports = router;
