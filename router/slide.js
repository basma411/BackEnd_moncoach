const express = require('express');
const router = express.Router();
const { addSlide, getSlide, updateSlide, deleteSlide } = require('../controllers/Slide');
const adminAuthMiddleware = require('../middlewares/AutoAdmin');
const { upload } = require('../middlewares/upload');

// Route for adding a slide
router.post('/add-slide',upload.single("photo"),adminAuthMiddleware, addSlide);

// Route for getting all slides
router.get('/get-slide', getSlide);

// Route for updating a slide
router.put('/update-slide/:id',upload.single("photo"),adminAuthMiddleware, updateSlide);
// Route for deleting a slide
router.delete('/delete-slide/:id',adminAuthMiddleware, deleteSlide);
module.exports = router;
