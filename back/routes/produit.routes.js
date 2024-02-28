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
    removeImage
} = require('../controllers/produit.controller');
const { verifToken, verifAdminToken } = require('../config/auth.config');
const {single} = require("../config/multer.config");

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.get('/by-categorie/:id', getAllByCategorie);
router.get('/search/:search', getBySearch);

router.post('/add', verifAdminToken, add);
router.post('/update', verifAdminToken, update);
router.post('/add-avis', verifToken, addAvis);
router.post('/add-image' /* single('image') */, verifAdminToken, addImage);

router.delete('/remove-image', removeImage);

module.exports = router;