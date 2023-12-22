const express = require('express');
const {
    getUtilisateurById,
    getUtilisateurs,
    connexion
} = require('../controllers/utilisateur.controller');
const { verifToken, verifMyAccToken, verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/:id', verifMyAccToken, getUtilisateurById);
router.get('/', verifAdminToken, getUtilisateurs);
router.post('/connexion', connexion);

module.exports = router;