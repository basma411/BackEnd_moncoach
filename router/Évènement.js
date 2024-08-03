const express = require("express");
const { upload } = require("../middlewares/upload");
const {
  AddEvenements,
  GetEvenements,
  PutEvenements,
  deleteEvenements,
  getEvenementById,
  opengraph,
  
} = require("../controllers/Evenements");
const adminAuthMiddleware = require("../middlewares/AutoAdmin");
const router = express.Router();

router.post("/Evenements", upload.single("photo"), AddEvenements);
router.get("/Evenements/get", GetEvenements);
router.put(
  "/Evenements/Put/:id",
  upload.single("photo"),
  adminAuthMiddleware,
  PutEvenements
);
router.delete("/Evenements/delete/:id", deleteEvenements);
router.get('/Events/:id',opengraph);

module.exports = router;
