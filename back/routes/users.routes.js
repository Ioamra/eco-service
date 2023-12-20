const express = require('express');
const {
    getUserById,
    getUsers
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/:id', getUserById);
router.get('/', getUsers);

module.exports = router;