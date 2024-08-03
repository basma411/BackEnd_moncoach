const express = require("express");
const { addIcon, getIcon, updateicon } = require("../controllers/Icon");
const { upload } = require("../middlewares/upload");
const adminAuthMiddleware = require("../middlewares/AutoAdmin");

const router = express.Router();

router.post("/Icon",upload.single("image"), addIcon);
router.get("/Icon/get",getIcon);
router.put("/Icon/update/:id",adminAuthMiddleware,upload.single("image"),updateicon );

module.exports = router;
