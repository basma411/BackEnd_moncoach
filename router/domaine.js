const express = require("express");
const {
  AddDomaine,
  GetDomaine,
  DeleteDomain,
  updateDomain,
} = require("../controllers/Domaine");
const router = express.Router();

router.post("/Domaine", AddDomaine);
router.get("/Domaine/get", GetDomaine);
router.delete("/Domaine/delete/:id", DeleteDomain);
router.put("/Domaine/update/:id", updateDomain);

module.exports = router;
