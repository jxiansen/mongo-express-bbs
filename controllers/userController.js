/**
 * 导入User模型
 */

const User = require("./../models/users");

/**
 * 异步创建用户信息
 */

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
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
 * 中间件函数,每次post信息前检查是否是用户,是用户了才能继续修改信息
 */

// const checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: "fail",
//       message: "错误的名称或者价格",
//     });
//   }
//   next();
// };
