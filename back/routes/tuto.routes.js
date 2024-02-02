const express = require('express');
const {
    getById,
    getAll,
    addAvis,
    add,
    remove
} = require('../controllers/tuto.controller');
const { verifToken, verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);

router.post('/add-avis', verifToken, addAvis);
router.post('add', verifAdminToken, add);

router.delete('remove', verifAdminToken, remove);

module.exports = router;