const express = require('express');
const {
    getById,
    getAllByCategorie,
    getBySearch,
    add,
    update,
    addAvis,
    getAll,
    addImage,
    removeImage,
} = require('../controllers/produit.controller');
const { verifToken, verifAdminToken } = require('../config/auth.config');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.get('/by-categorie/:id', getAllByCategorie);
router.get('/search/:search', getBySearch);

router.post('/add', add);
router.post('/update', update);
router.post('/add-avis', addAvis);
router.post('/add-image', addImage);

router.delete('/remove-image', removeImage);

module.exports = router;