const express = require('express');
const {
    getAll, 
    add,
    remove
} = require('../controllers/categorie.controller');
const { verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/', getAll);

router.post('/add', verifAdminToken, add);
router.delete('/remove', verifAdminToken, remove);

module.exports = router;