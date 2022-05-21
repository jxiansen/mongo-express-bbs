const express = require("express");
const router = express.Router();
const articleController = require("./../controllers/articleController");

router
  .route("/")
  // .get(articleController.getArticleById)
  .post(articleController.createArticle)
  .get(articleController.getAllArticle);

/**
 * 添加新帖子
 */
router.route("/new").get(articleController.getAllArticle);

module.exports = router;
