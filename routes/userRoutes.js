const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
/**
 * 创建用户,获取所有用户
 */
router
  .route("/")
  .post(userController.createUser)
  .get((req, res) => res.send("hi"));

// router
//   .route("/:username")
//   .get(getUser) // 根据用户名查询信息
//   .patch(updateUser)
//   .delete(deleteUser);

module.exports = router;
