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

```json
user : ObjectId  //创建用户
title: String //标题
content: String // 文章内容
createdAt: Date // 文章创建时间
comments: Array // 所有评论组成的数组
tags: Array // 文章的标签
```

- users 用户个人信息集合

```json
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
