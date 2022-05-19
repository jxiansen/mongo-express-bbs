const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
/**
 * 创建用户,获取所有用户
 */
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route("/:id").get(userController.getUserById); // 根据用户名查询信息
// .patch(updateUser)
// .delete(deleteUser);

module.exports = router;
