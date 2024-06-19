const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../middlewares/AutoAdmin');
const { AddFaq, GetFaq } = require('../controllers/Faq');


// Route for adding a bibliography entry with file upload
router.post('/add-faq',adminAuthMiddleware, AddFaq);
router.get('/get-faq', GetFaq);



module.exports = router;
