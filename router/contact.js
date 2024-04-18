const express = require("express");
const router = express.Router();
const AutoCoach = require("../middlewares/AutoCoach");
const adminAuthMiddleware = require("../middlewares/AutoAdmin");
const {
  AddContact,
  deleteContact,
  GetContact,
} = require("../controllers/Contact");

router.post("/Contact", AddContact);
router.get("/Contact/get", adminAuthMiddleware, GetContact);
router.delete("/Contact/delete/:id", adminAuthMiddleware, deleteContact);
module.exports = router;
