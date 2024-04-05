

const express = require("express");
const { upload } = require("../middlewares/upload");
const { AddEvenements,GetEvenements, PutEvenements } = require("../controller/Evenements");
const adminAuthMiddleware = require("../middlewares/AutoAdmin");
const router = express.Router();



router.post('/Evenements',upload.single('Photo'), AddEvenements);
router.get('/Evenements/get', GetEvenements);
router.put('/Evenements/Put/:id',upload.single('Photo'),adminAuthMiddleware, PutEvenements);

module.exports = router;
