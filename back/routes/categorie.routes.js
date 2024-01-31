const express = require('express');
const {
    getAllCategorie, 
    addCategorie
} = require('../controllers/categorie.controller');
const { verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/', getAllCategorie);
router.post('/add-categorie', verifAdminToken, addCategorie);

module.exports = router;