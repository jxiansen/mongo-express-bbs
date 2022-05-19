const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String, default: "title", trim: true, maxlength: 400 }, // 文章标题
  content: { type: String, default: "", trim: true, maxlength: 2000 }, // 文章内容
  user: { type: mongoose.Schema.ObjectId, ref: "User" }, // 文章作者
  comments: [
    {
      body: { type: String, default: "评论", maxlength: 100 },
      user: { type: mongoose.Schema.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});
