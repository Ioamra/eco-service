const express = require('express');
const {
    getById,
    getAll,
    connexion,
    inscription,
    update,
    toggleAdminRole,
    toggleBanUnban
} = require('../controllers/utilisateur.controller');
const { verifToken, verifMyAccToken, verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/:id', verifMyAccToken, getById);
router.get('/', verifAdminToken, getAll);

router.post('/connexion', connexion);
router.post('/inscription', inscription);
router.post('/update', verifMyAccToken, update);
router.post('/toggle-admin-role', verifAdminToken, toggleAdminRole);
router.post('/toggle-ban-unban', verifAdminToken, toggleBanUnban);

module.exports = router;