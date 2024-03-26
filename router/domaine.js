

const express = require("express");
const { AddDomaine, GetDomaine } = require("../controller/Domaine");
const router = express.Router();



router.post('/Domaine',AddDomaine);
router.get('/Domaine/get', GetDomaine);

module.exports = router;
