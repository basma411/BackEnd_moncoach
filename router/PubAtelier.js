const express = require('express');
const { addPubAtelier, getPubAteliers, updatePubAtelier, deletePubAtelier } = require('../controllers/PubAtelier');
const adminAuthMiddleware = require('../middlewares/AutoAdmin');
const router = express.Router();


// Route for adding a pub atelier
router.post('/pub-ateliers',adminAuthMiddleware, addPubAtelier);

// Route for getting all pub ateliers
router.get('/pub-ateliers', getPubAteliers);

// Route for updating a pub atelier
router.put('/pub-ateliers/:id',adminAuthMiddleware, updatePubAtelier);

// Route for deleting a pub atelier
router.delete('/pub-ateliers/:id',adminAuthMiddleware, deletePubAtelier);

module.exports = router;

