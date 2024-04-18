const express = require("express");
const router = express.Router();
const { AddAdmin, LoginAdmin, GetAdmin } = require("../controllers/Admin");
const adminAuthMiddleware = require("../middlewares/AutoAdmin");

// Route pour ajouter un administrateur
router.post("/admin", AddAdmin);
router.post("/admin/login", LoginAdmin);
router.get("/Admin/Get", adminAuthMiddleware, GetAdmin);

module.exports = router;
