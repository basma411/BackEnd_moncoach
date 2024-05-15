const express = require("express");
const { upload } = require("../middlewares/upload");
const {
  AddArticle,
  GetArticlesInvisible,
  DeleteArticle,
  GetArticlesVisible,
} = require("../controllers/Article");
const { UpdateArticle } = require("../controllers/Article");
const adminAuthMiddleware = require("../middlewares/AutoAdmin");
const router = express.Router();

router.post("/Article",   upload.fields([{ name: "imagee" }]), AddArticle);
router.get("/ArticleInvisible/get",adminAuthMiddleware, GetArticlesInvisible);
router.get("/ArticleVisible/get", GetArticlesVisible);

router.put(
  "/Article/put/:id",
  upload.single("Photo"),
  adminAuthMiddleware,
  UpdateArticle
);
router.delete("/Article/delete/:id", adminAuthMiddleware, DeleteArticle);

module.exports = router;
