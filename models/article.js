const mongoose = require("mongoose");

/**
 * 文章内容Schema约束
 */
const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, default: "", trim: true, maxlength: 400 }, // 文章标题
    content: { type: String, default: "", trim: true, maxlength: 1000 }, // 文章内容
    username: { type: mongoose.Schema.ObjectId, ref: "User" }, // 文章作者
    comments: [
      // 评论
      {
        content: { type: String, default: "", maxlength: 200 }, // 评论内容
        user: { type: mongoose.Schema.ObjectId, ref: "User" }, // 评论用户
        createdAt: { type: Date, default: Date.now }, // 评论时间
      },
    ],
    backgroundImg: { type: String },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now }, // 文章的创建时间
  },
  { versionKey: false }
);

/**
 * 文章内容实体
 */
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
