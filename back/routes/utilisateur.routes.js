const express = require('express');
const {
    getUtilisateurById,
    getUtilisateurs,
    connexion
} = require('../controllers/utilisateur.controller');

const router = express.Router();

router.get('/:id', getUtilisateurById);
router.get('/', getUtilisateurs);
router.post('/connexion', connexion);

module.exports = router;