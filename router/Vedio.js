const express = require("express");
const { upload } = require("../middlewares/upload");
const adminAuthMiddleware = require("../middlewares/AutoAdmin");
const {
  AddVedio,
  DeleteVedio,
  UpdateVedio,
  GetVedios,
} = require("../controllers/Vedio");
const router = express.Router();

// Route to add a new video

router.post("/Vedio", upload.single("images"), adminAuthMiddleware, AddVedio);
// Route to delete a video
router.delete("/Vedio/delete/:id", adminAuthMiddleware, DeleteVedio);

// Route to update a video
router.put(
  "/vedio/put/:id",
  upload.single("images"),
  adminAuthMiddleware,
  UpdateVedio
);
// Route to get a video
router.get("/vedio/get", GetVedios);
module.exports = router;
