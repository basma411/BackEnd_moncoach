

const express = require("express");
const { upload } = require("../middlewares/upload");
const { AddArticle,GetArticle,DeleteArticle } = require("../controller/Article");
const { UpdateArticle } = require("../controller/Article");
const adminAuthMiddleware = require("../middlewares/AutoAdmin");
const router = express.Router();



router.post('/Article',upload.single('Photo'), AddArticle);
router.get('/Article/get', GetArticle);
router.put('/Article/put/:id',upload.single('Photo'),adminAuthMiddleware,UpdateArticle)
router.delete('/Article/delete/:id',adminAuthMiddleware,DeleteArticle)

module.exports = router;
