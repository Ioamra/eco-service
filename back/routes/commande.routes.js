const express = require('express');
const {
    getAll,
    getPanier,
    createPanier,
    updatePanier,
    removePanier,
    commanderPanier
} = require('../controllers/commande.controller');
const { verifToken, verifMyAccToken, verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/', verifAdminToken, getAll);
router.get('/get-panier', verifToken, getPanier)

router.post('/create-panier', verifToken, createPanier);
router.post('/update-panier', verifToken, updatePanier);
router.post('/commander-panier', verifToken, commanderPanier);


router.delete('/remove-panier', verifToken, removePanier);

module.exports = router;