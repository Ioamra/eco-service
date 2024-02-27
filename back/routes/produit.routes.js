const express = require('express');
const {
    getById,
    getAllByCategorie,
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

router.post('/add', add);
router.post('/update', update);
router.post('/add-avis', addAvis);
router.post('/add-image' /* single('image') */, addImage);

router.delete('/remove-image', removeImage);

module.exports = router;