const express = require("express");
const { registre, login, getcoach, putCoach, deleteCoach, getCoachesInvisible, getCoachesVisible } = require("../controller/coach");
const router = express.Router();
const { upload } = require("../middlewares/upload");
const { check } = require("express-validator");
const AutoCoach = require("../middlewares/AutoCoach");
const  adminAuthMiddleware = require("../middlewares/AutoAdmin");

router.post(
  '/registre',
  upload.fields([{ name: 'Photo' }, { name: 'Logo' }, { name: 'FichierPDF' }]),
  [
  //   // Validation checks using express-validator
  //   check('Password', 'Your password should contain at least 5 characters.').isLength({ min: 5 }),
   check('Email', 'Invalid value for email.').isEmail(),
   ],
  registre
);

router.post("/login", login);
router.get("/getCoach", AutoCoach, getcoach);
router.get("/coachesVisible", adminAuthMiddleware, getCoachesVisible); 
router.get("/coachesInvisible", adminAuthMiddleware, getCoachesInvisible); 

router.put("/putcoach/:id",  upload.fields([{ name: 'Photo' }, { name: 'Logo' }, { name: 'FichierPDF' }]),adminAuthMiddleware, putCoach);
router.delete("/deletecoach/:id", adminAuthMiddleware, deleteCoach);

module.exports = router;
