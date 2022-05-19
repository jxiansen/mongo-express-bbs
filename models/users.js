/**
 * 引入模块
 */

const mongoose = require("mongoose");

/**
 * 用户约束模式
 */
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true }, // unique : 不允许重复
    email: { type: String, required: [true, "邮箱是必填项！"] },
    hashed_password: { type: String, default: "" },
  },
  { versionKey: false }
);

/**
 * 根据约束生成用户实例
 */

const User = mongoose.model("User", UserSchema);

/**
 * 用户输入信息验证
 */

UserSchema.path("username").validate(
  (username) => username.length,
  "用户名不能为空"
);
UserSchema.path("email").validate((email) => email.length, "邮箱不能为空");
UserSchema.path("hashed_password").validate(
  (hashed_password) => hashed_password.length,
  "密码不能为空"
);

/**
 * 导出User model
 */

module.exports = User;
