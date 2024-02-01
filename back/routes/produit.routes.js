const express = require('express');
const {
    getProduitById,
    getAllProduitByCategorie,
    add,
    update
} = require('../controllers/produit.controller');
const { verifToken, verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/:id', getProduitById);
router.get('/by-categorie/:id', getAllProduitByCategorie);

router.post('/add', verifAdminToken, add);
router.post('/update', update);

module.exports = router;