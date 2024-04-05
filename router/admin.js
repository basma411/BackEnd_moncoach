const express = require('express');
const router = express.Router();
const { AddAdmin, LoginAdmin } =  require("../controller/Admin");

// Route pour ajouter un administrateur
router.post('/admin', AddAdmin);
router.post('/admin/login', LoginAdmin);


module.exports = router;
