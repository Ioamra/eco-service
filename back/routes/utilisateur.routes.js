const express = require('express');
const {
    getUtilisateurById,
    getUtilisateurs,
    connexion,
    inscription,
    update,
    toggleAdminRole,
    toggleBanUnban
} = require('../controllers/utilisateur.controller');
const { verifToken, verifMyAccTokenForGet, verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/:id', verifMyAccTokenForGet, getUtilisateurById);
router.get('/', verifAdminToken, getUtilisateurs);

router.post('/connexion', connexion);
router.post('/inscription', inscription);
router.post('/update', update);
router.post('/toggle-admin-role', verifAdminToken, toggleAdminRole);
router.post('/toggle-ban-unban', verifAdminToken, toggleBanUnban);

module.exports = router;