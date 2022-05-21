# BBS 项目

## 项目结构

```sh
├── app
│   ├── controllers
│   ├── models
│   └── views
├── config
│   └── routes
├── config.js
├── middleWare.js
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── css
│   ├── img
│   └── js
├── README.md
└── server.js
```

- `server.js`: 数据库配置,错误处理,环境变量

## 包含功能

- 用户注册
- 用户登录
- 身份验证
- 验证码
- 多文件上传

## 路由

- `/`: 展示帖子
- `/register` :注册
- `/login` :登录
- `/forget`: 找回
- `/upload`: 上传文件

## 项目结构

## 数据库建模

数据库包含三个集合文件

- article 文章集合

```sh
user : ObjectId  //创建用户
title: String //标题
content: String // 文章内容
createdAt: Date // 文章创建时间
comments: Array // 所有评论组成的数组
tags: Array // 文章的标签
```

- users 用户个人信息集合

```sh
name: String  // 用户全名
email: String  // 用户邮箱
hashed_password:  String  // 经过哈希加密过的用户密码
username: String  // 用户名
authToken:  String  // 用户真名
```

## 依赖文件

- `dotenv` 读取 `.env` 文件中的环境变量

```js
require("dotenv").config();
console.log(process.env); // remove this after you've confirmed it working
```

### 文件上传

#### 单文件上传

```js
//dest设置上传原始文件的路径，single要与file的name保持一致
app.post(
  "/upload",
  multer({ dest: "./public/upload_tmp/" }).single("file"),
  function (req, res, next) {
    if (req.file.length === 0) {
      res.render("error", { message: "上传文件不能为空！" });
      return;
    } else {
      let file = req.file;
      //存储上传对象信息
      let fileInfo = {};
      //修改名字，第一个参数为旧路径，第二个参数为新路径（注意：旧路径要和上面的dest保持一致）
      fs.renameSync(
        "./public/upload_tmp/" + file.filename,
        "./public/images/" + file.originalname
      );
      // 获取文件信息
      fileInfo.mimetype = file.mimetype;
      fileInfo.originalname = file.originalname;
      fileInfo.size = file.size;
      fileInfo.path = file.path;
      //设置响应类型、编码
      res.set({
        "content-type": "application/json; charset=utf-8",
      });
      res.end("成功");
    }
  }
);
```

```js
//与单文件相比唯一的不同就是不再使用.single
//改为.array('file', 10)，其中的file和.single的参数一样，10为上传数目的最大限制
app.post(
  "/upload",
  multer({ dest: "./public/upload_tmp/" }).array("file", 10),
  function (req, res, next) {
    let files = req.files;
    if (files.length === 0) {
      res.render("error", { message: "上传文件不能为空！" });
      return;
    } else {
      let fileInfos = [];
      for (var i in files) {
        let file = files[i];
        let fileInfo = {};

        fs.renameSync(
          "./public/upload_tmp/" + file.filename,
          "./public/images/" + file.originalname
        );

        //获取文件基本信息
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;

        fileInfos.push(fileInfo);
      }
      // 设置响应类型、编码
      res.set({
        "content-type": "application/json; charset=utf-8",
      });
      res.end("成功");
    }
  }
);
```

前台 `html` 页面设置

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <!-- multiple允许多文件上传，单文件可忽略-->
  <input id="files" type="file" name="file" multiple />
  <input type="submit" value="上传" />
</form>
```

#### mongoose 中查询信息的两种方式

```js
// 第一种方法
cosnt user = await User.find({
  {
    age: 12,
    height: 180,
  }
})

// 第二种方法
const user = await User.find()
  .where("age")
  .equals(12)
  .where("height")
  .equals("180")
```
