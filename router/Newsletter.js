const express = require("express");
const adminAuthMiddleware = require("../middlewares/AutoAdmin");
const {
  AddNewsletter,
  GetNewsletter,
  DeleteNewsletter,
} = require("../controllers/Newsletter");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/Newsletter",
  [check("email", "Invalid value for email.").isEmail()],
  AddNewsletter
);

router.get("/Newsletter/get", adminAuthMiddleware, GetNewsletter);
router.delete("/Newsletter/delete/:id", adminAuthMiddleware, DeleteNewsletter);
module.exports = router;
