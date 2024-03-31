const express = require('express');
const router = express.Router();
const { AddAdmin } =  require("../controller/Admin");

// Route pour ajouter un administrateur
router.post('/add-admin', AddAdmin);

module.exports = router;
