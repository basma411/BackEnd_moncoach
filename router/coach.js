const express = require("express");
const {
  registre,
  login,
  getcoach,
  putCoach,
  deleteCoach,
  getCoachesInvisible,
  getCoachesVisible,
  updateCoachCredentials,
  putCoachImage,
} = require("../controllers/coach");
const router = express.Router();
const { upload } = require("../middlewares/upload");
const { check } = require("express-validator");
const AutoCoach = require("../middlewares/AutoCoach");
const adminAuthMiddleware = require("../middlewares/AutoAdmin");

router.post(
  "/registre",
  upload.fields([{ name: "Photo" }, { name: "Logo" }, { name: "FichierPDF" }]),
  [check("Email", "Invalid value for email.").isEmail()],
  registre
);

router.post("/login", login);
router.get("/getCoach", AutoCoach, getcoach);
router.get("/coachesVisible", adminAuthMiddleware, getCoachesVisible);
router.get("/coachesInvisible", adminAuthMiddleware, getCoachesInvisible);
router.put(
  "/putcoach/:id",
  upload.fields([{ name: "imagee" }, { name: "Logo" }, { name: "FichierPDF" }]),
  AutoCoach,
  putCoach
);
router.put('/coach/edit',AutoCoach,upload.fields([{ name: "imagee" }, { name: "Logo" }, { name: "FichierPDF" }]),updateCoachCredentials)
router.delete("/deletecoach/:id", adminAuthMiddleware, deleteCoach);
///image
router.put('/editImage/:id',AutoCoach,upload.fields([{ name: "imagee" }, { name: "Logo" }, { name: "FichierPDF" }]),putCoachImage)
module.exports = router;
