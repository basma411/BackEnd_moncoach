const express = require('express');
const router = express.Router();
const {
    addInterface,
    getInterfaces,
    updateInterface
} = require('../controllers/Interface');
const { upload } = require('../middlewares/upload');




// Route for adding an interface document with file upload
router.post('/add-interfaces', upload.single('image'), addInterface);

// Route for getting all interface documents
router.get('/get-interfaces', getInterfaces);

// Route for updating an interface document with file upload
router.put('/put-interfaces/:id', upload.single('image'), updateInterface);

module.exports = router;
