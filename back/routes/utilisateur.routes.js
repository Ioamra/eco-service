const express = require('express');
const {
    getUtilisateurById,
    getUtilisateurs,
    connexion
} = require('../controllers/utilisateur.controller');
const { authenticateToken } = require('../config/auth.config');

const router = express.Router();

router.get('/:id', authenticateToken, getUtilisateurById);
router.get('/', authenticateToken, getUtilisateurs);
router.post('/connexion', connexion);

module.exports = router;