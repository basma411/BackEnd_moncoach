

const express = require("express");
const { upload } = require("../middlewares/upload");
const { AddEvenements,GetEvenements } = require("../controller/Evenements");
const router = express.Router();



router.post('/Evenements',upload.single('Photo'), AddEvenements);
router.get('/Evenements/get', GetEvenements);

module.exports = router;
