const express = require('express');
const router = express.Router();
const {
    addTemoignage,
    updateTemoignage,
    deleteTemoignage,
    getTemoignageInvisible,
    getTemoignageVisible
} = require('../controllers/Témoignage');
const adminAuthMiddleware = require('../middlewares/AutoAdmin');

router.post('/add-temoignages', addTemoignage);

router.get('/get-temoignages-Invisible',adminAuthMiddleware, getTemoignageInvisible);
router.get('/get-temoignages-Visible', getTemoignageVisible);


router.put('/put-temoignages/:id',adminAuthMiddleware, updateTemoignage);

router.delete('/delete-temoignages/:id',adminAuthMiddleware, deleteTemoignage);

module.exports = router;
