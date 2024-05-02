const express = require('express');
const router = express.Router();
const {
    addBiblio,
    getBiblios,
    updateBiblio
} = require('../controllers/Biblio');
const { upload } = require('../middlewares/upload');
const adminAuthMiddleware = require('../middlewares/AutoAdmin');


// Route for adding a bibliography entry with file upload
router.post('/add-biblios', upload.single('image'), addBiblio);

// Route for getting all bibliography entries
router.get('/get-biblios', getBiblios);

// Route for updating a bibliography entry with file upload
router.put('/put-biblios/:id',adminAuthMiddleware, upload.single('image'), updateBiblio);

module.exports = router;
