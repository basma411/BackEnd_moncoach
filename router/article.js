

const express = require("express");
const { upload } = require("../middlewares/upload");
const { AddArticle,GetArticle } = require("../controller/Article");
const router = express.Router();



router.post('/Article',upload.single('Photo'), AddArticle);
router.get('/Article/get', GetArticle);

module.exports = router;
