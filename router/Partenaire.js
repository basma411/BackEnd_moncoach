const express = require("express");
const { upload } = require("../middlewares/upload");
const adminAuthMiddleware = require("../middlewares/AutoAdmin");
const {
  AddPartenaire,
  getPartenaires,
  deletePartenaire,
} = require("../controllers/Partenaire");
const router = express.Router();

router.post(
  "/Partenaire",
  upload.single("Photo"),
  adminAuthMiddleware,
  AddPartenaire
);
router.get("/partenaires/get", getPartenaires);
router.delete("/partenaires/delete/:id", deletePartenaire);

module.exports = router;
