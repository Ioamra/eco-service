const express = require('express');
const {
    getById,
    getAll,
    addAvis,
    add
} = require('../controllers/tuto.controller');
const { verifToken, verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);

router.post('/add-avis', verifToken, addAvis);
router.post('add', verifAdminToken, add)

module.exports = router;