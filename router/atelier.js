const express = require('express');
const router = express.Router();
const { AddAtelier, GetAtelier, DeleteAtelier } = require('../controllers/Atelier');
const { upload } = require('../middlewares/upload');
const adminAuthMiddleware = require('../middlewares/AutoAdmin');

// Route for adding a bibliography entry with file upload
router.post('/add-atelier', upload.single('photo'), adminAuthMiddleware, AddAtelier);
router.get('/get-atelier', GetAtelier);

module.exports = router;
