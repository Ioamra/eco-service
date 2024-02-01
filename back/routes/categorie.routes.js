const express = require('express');
const {
    getAll, 
    add
} = require('../controllers/categorie.controller');
const { verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/', getAll);
router.post('/add-categorie', verifAdminToken, add);

module.exports = router;