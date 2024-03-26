const express = require("express");
const { registre, login } = require("../controller/coach");
const router = express.Router();
const { upload } = require("../middlewares/upload");
const { check } = require("express-validator");

router.post(
  "/registre",
  upload.fields([{ name: "Photo" }, { name: "Logo" }, { name: "FichierPDF" }]), 
  registre
);

router.post("/login", login);

module.exports = router;
