const express = require('express');
const {
    getById,
    getAll
} = require('../controllers/tuto.controller');
const { verifToken, verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;