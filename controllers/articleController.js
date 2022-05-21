/**
 * 导入文章模型
 */
const Article = require("./../models/article");

/**
 * 创建文章
 */
exports.createArticle = async (req, res) => {
  console.log(req.body);
  const newArticle = await Article.create(req.body);
  res.status(200).json({ status: "scuscess", message: `创建用户成功！🎉` });
};

/**
 * 返回所有文章
 */
exports.getAllArticle = async (req, res) => {
  const data = await Article.find(); // 获得所有的文章数据
  res.status(200).json({
    status: "scuscess",
    message: `获取所有用户成功！🎉`,
    data,
  });
};
