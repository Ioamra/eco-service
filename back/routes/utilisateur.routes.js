const express = require('express');
const {
    getUtilisateurById,
    getUtilisateurs
} = require('../controllers/utilisateur.controller');

const router = express.Router();

router.get('/:id', getUtilisateurById);
router.get('/', getUtilisateurs);

module.exports = router;