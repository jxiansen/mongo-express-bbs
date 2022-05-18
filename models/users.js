/**
 * 引入模块
 */

const mongoose = require("mongoose");

/**
 * 用户约束模式
 */
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true }, // unique : 不允许重复
  email: { type: String, required: [true, "邮箱是必填项！"] },
  hashed_password: { type: String, default: "" },
});

/**
 * 根据约束生成用户实例
 */

const User = mongoose.model("User", UserSchema);

/**
 * 导出User model
 */

module.exports = User;
