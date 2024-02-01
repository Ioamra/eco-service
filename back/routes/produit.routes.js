const express = require('express');
const {
    getById,
    getAllByCategorie,
    add,
    update
} = require('../controllers/produit.controller');
const { verifToken, verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/:id', getById);
router.get('/by-categorie/:id', getAllByCategorie);

router.post('/add', verifAdminToken, add);
router.post('/update', update);

module.exports = router;