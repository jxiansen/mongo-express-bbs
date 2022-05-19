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
const multer = require("multer"); //multer插件

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
/**
 * 访问/apple/echo,返回相应的单词
 */
router.get("/:word/echo", (req, res) => {
  console.log(req);
  const { word } = req.params;
  res.json({
    echo: word,
  });
});
/**
 * 接收用户所有的注册信息,包括用户名,邮箱,密码
 */
router.post("/register", (req, res) => {
  const userObj = _.pick(req.body, ["username", "email", "password"]);
  console.log(userObj);
  res.json({ hi: 12 });
});

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

/**
 * 单文件上传功能,上传成功后,修改文件名并返回文件存储路径
 */
router.post(
  "/upload",
  multer({ dest: "./public/upload/" }).single("file"),
  (req, res, next) => {
    try {
      // 原来的名字
      const originalname = path.join(
        process.cwd(),
        req.file.destination,
        req.file.originalname
      );
      // 存储后的名字
      const name = path.join(process.cwd(), req.file.path);
      fs.renameSync(name, originalname); // 重命名
      res.json({
        status: "scuscess",
        message: `文件上传成功！🎉`,
        data: originalname,
      });
    } catch (err) {
      res.json({
        status: "faild",
        message: `文件上传失败,${err}`,
      });
    }
  }
);

/**
 * 多文件上传,并返回上传所有文件路径
 */
router.post(
  "/uploads",
  multer({ dest: "./public/upload/" }).array("file", 8), // 改成数组代表为多文件上传,10为最大数目
  (req, res, next) => {
    try {
      if (!req.files.length) {
        return res.json({
          status: "failed",
          message: "上传文件不能为空！",
        });
      }
      // req.files : 上传的所有文件组成的数组
      function rename(obj) {
        const originalname = path.join(
          process.cwd(),
          obj.destination,
          obj.originalname
        );
        // 存储后的名字
        const name = path.join(process.cwd(), obj.path);
        fs.renameSync(name, originalname);
        return originalname;
      }
      const namesArray = req.files.map(rename); // 批量重命名
      res.json({
        status: "scuscess",
        message: `多个文件上传成功！🎉`,
        data: namesArray,
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: `上传多个文件失败！${err}`,
      });
    }
  }
);
module.exports = router;
