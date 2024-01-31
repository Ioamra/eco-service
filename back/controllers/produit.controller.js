const bdd = require('../config/bdd.config.js');

const getProduitById = async (req, res) => {
    try {
        const query = `SELECT 
            JSON_OBJECT(
                'id_produit', produit.id_produit,
                'nom', produit.nom,
                'description', produit.description,
                'quantite', produit.quantite,
                'prix', produit.prix,
                'promo', produit.promo,
                'date_fin_promo', produit.date_fin_promo
            ) AS produit,
            JSON_OBJECT(
                'nom', categorie.nom,
                'url', CONCAT('images/categorie/', categorie.id_categorie, '.', categorie.ext_image)
            ) AS categorie,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT('url', CONCAT('images/produit/', image.id_image, '.', image.ext))
                )
                FROM image
                WHERE image.id_produit = produit.id_produit
            ), '[]') AS images,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'description', avis.description,
                        'note', avis.note,
                        'date_avis', avis.date_avis
                    )
                )
                FROM avis
                WHERE avis.id_produit = produit.id_produit
            ), '[]') AS avis,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'titre', tuto.titre,
                        'description', tuto.description,
                        'url_img', CONCAT('images/tuto/', tuto.id_tuto, '.', tuto.ext_image),
                        'date_tuto', tuto.date_tuto
                    )
                )
                FROM tuto_produit_association
                INNER JOIN tuto ON tuto_produit_association.id_tuto = tuto.id_tuto
                WHERE tuto_produit_association.id_produit = produit.id_produit
            ), '[]') AS tuto
        FROM produit 
        INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie
        WHERE produit.id_produit = ${req.params.id};`;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            data = data.map(item => ({
                produit: JSON.parse(item.produit),
                categorie: JSON.parse(item.categorie),
                images: JSON.parse(item.images),
                avis: JSON.parse(item.avis),
                tuto: JSON.parse(item.tuto),
            }));
            return res.status(200).json({ "status": "success", "data": data[0]});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
};

const getAllProduitByCategorie = async (req, res) => {
    try {
        const query = `SELECT 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id_produit', produit.id_produit,
                    'nom', produit.nom,
                    'description', produit.description,
                    'quantite', produit.quantite,
                    'prix', produit.prix,
                    'promo', produit.promo,
                    'date_fin_promo', produit.date_fin_promo,
                    'url_img', (SELECT CONCAT('images/produit/', image.id_image, image.ext) FROM image WHERE image.id_produit = produit.id_produit LIMIT 1),
                    'note_moyenne', (SELECT AVG(avis.note) FROM avis WHERE avis.id_produit = produit.id_produit)
                )
            ) AS produit
        FROM produit
        INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie
        WHERE categorie.id_categorie = ${req.params.id}`;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            data = data.map(item => ({
                produit: JSON.parse(item.produit)
            }))
            return res.status(200).json({ "status": "success", "data": data[0]});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const addProduit = async (req, res) => {
    try {
        const { nom, description, quantite, prix, images } = req.body;
        const query = ``;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({ "status": "success", "data": data[0]});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const exemple = async (req, res) => {
    try {
        const query = ``;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({ "status": "success", "data": data[0]});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

module.exports = { getProduitById, getAllProduitByCategorie, addProduit };