/**
 * 导入User模型
 */

const User = require("./../models/users");

/**
 * 建用户信息
 */
exports.createUser = async (req, res) => {
  try {
    console.log("-----------------------------------");
    console.log(req.body);
    console.log("-----------------------------------");
    const newUser = await User.create(req.body);

    res.status(200).json({
      status: "scuscess",
      message: `创建用户成功！🎉`,
    });
  } catch (err) {
    // 创建失败，捕获错误并返回错误信息到前台
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: `创建用户失败`,
      err: err,
    });
  }
};

/**
 * 获取所有用户
 */
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({
      status: "scuscess",
      message: `查询所有用户成功！🎉`,
      data: allUsers,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: `查询所有用户失败${err}`,
    });
  }
};

/**
 * 根据id获取用户
 */
exports.getUserById = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    // 这种写法是 User.findOne({ _id: req.params.id }) 的简写
    res.status(200).json({
      status: "scuscess",
      message: `查询所有用户成功！🎉`,
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      status: "faild",
      message: `用户查询失败${err}`,
    });
  }
};
