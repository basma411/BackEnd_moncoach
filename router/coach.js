const express = require("express");
const { registre, login, getcoach, putCoach, deleteCoach } = require("../controller/coach");
const router = express.Router();
const { upload } = require("../middlewares/upload");
const { check } = require("express-validator");
const AutoCoach = require("../middlewares/AutoCoach");
const  adminAuthMiddleware = require("../middlewares/AutoAdmin");

router.post(
  "/registre",
  upload.fields([{ name: "Photo" }, { name: "Logo" }, { name: "FichierPDF" }]), 
  registre
);

router.post("/login", login);
router.get("/getCoach", AutoCoach, getcoach);

router.put("/putcoach/:id", adminAuthMiddleware, putCoach);
router.delete("/deletecoach/:id", adminAuthMiddleware, deleteCoach);

module.exports = router;
