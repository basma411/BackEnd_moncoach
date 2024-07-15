const express = require('express');
const adminAuthMiddleware = require('../middlewares/AutoAdmin');
const { AddList, getList, DeleteAtelier } = require('../controllers/ListeEntrepCoach');
const router = express.Router();


// Route for adding a pub atelier
router.post('/pub-List/:id', AddList);

// Route for getting all pub ateliers
router.get('/pub-List/get/:id',adminAuthMiddleware, getList);

router.delete('/delete-atelier/:id', adminAuthMiddleware, DeleteAtelier);

module.exports = router;

