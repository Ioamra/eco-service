const express = require('express');
const {
    getProduitById,
    getAllProduitByCategorie,
    addProduit
} = require('../controllers/produit.controller');
const { verifToken, verifMyAccToken, verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/:id', getProduitById);
router.get('/by-categorie/:id', getAllProduitByCategorie);

router.post('add', addProduit);

module.exports = router;