const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
/**
 * 创建用户,获取所有用户
 */
router
  .route("/")
  .get(userController.searchUser) // 根据用户的参数搜索信息
  .get(userController.getAllUsers) // 获取所有用户
  .post(userController.createUser); // 创建用户

router
  .route("/:id")
  .get(userController.getUserById) // 根据用户名查询信息
  .patch(userController.updateUser) // 更新用户信息
  .delete(userController.deleteUser);

module.exports = router;
