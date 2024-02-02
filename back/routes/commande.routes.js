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

router.post('/create-panier', verifMyAccToken, createPanier);
router.post('/update-panier', verifMyAccToken, updatePanier);
router.post('/commander-panier', verifMyAccToken, commanderPanier);


router.delete('/remove-panier', verifAdminToken, removePanier);

module.exports = router;