const express = require('express');
const {
    getAll, 
    add,
    remove
} = require('../controllers/categorie.controller');
const { verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/', getAll);
router.get('/remove', verifAdminToken, remove);

router.post('/add', verifAdminToken, add);

module.exports = router;