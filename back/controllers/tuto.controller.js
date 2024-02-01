const bdd = require('../config/bdd.config.js');
const { getDateActu } = require('../functions/getDateActu.js');

const getById = async (req, res) => {
    try {
        const query = `
        SELECT 
            JSON_OBJECT(
                'id_tuto', tuto.id_tuto,
                'titre', tuto.titre,
                'description', tuto.description,
                'ext_image', tuto.ext_image,
                'video', tuto.video,
                'date_tuto', tuto.date_tuto,
                'note_moyenne', (SELECT AVG(avis.note) FROM avis WHERE avis.id_tuto = tuto.id_tuto)
            ) AS tuto,
            COALESCE(
                (SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'nom', produit.nom,
                        'description', produit.id_produit,
                        'quantite', produit.quantite,
                        'prix', produit.prix,
                        'promo', produit.promo,
                        'date_fin_promo', produit.date_fin_promo,
                        'url_img', (SELECT CONCAT('images/produit/', image.id_image, image.ext) FROM image WHERE image.id_produit = produit.id_produit LIMIT 1),
                        'note_moyenne', (SELECT AVG(avis.note) FROM avis WHERE avis.id_produit = produit.id_produit)
                    )
                )
                FROM produit
                INNER JOIN tuto_produit_association ON produit.id_produit = tuto_produit_association.id_produit
                WHERE tuto_produit_association.id_tuto = tuto.id_tuto
            ), '[]') AS produit,
            (SELECT JSON_OBJECT(
                'id_utilisateur', utilisateur.id_utilisateur,
                'prenom', utilisateur.prenom,
                'nom', utilisateur.nom
            )
            FROM utilisateur
            WHERE utilisateur.id_utilisateur = tuto.id_utilisateur
            ) AS createur
        FROM tuto 
        WHERE tuto.id_tuto = ?;`;
        bdd.query(query, [req.params.id], (err, data) => {
            if (err) {
                throw err;
            }
            data = data.map(item => ({
                tuto: JSON.parse(item.tuto),
                produit: JSON.parse(item.produit),
                createur: JSON.parse(item.createur)
            }));
            return res.status(200).json({ "status": "success", "data": data[0]});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const getAll = async (req, res) => {
    try {
        const query = `SELECT 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id_tuto', tuto.id_tuto,
                    'titre', tuto.titre,
                    'description', tuto.description,
                    'ext_image', tuto.ext_image,
                    'video', tuto.video,
                    'date_tuto', tuto.date_tuto,
                    'id_createur', utilisateur.id_utilisateur,
                    'nom_createur', utilisateur.nom,
                    'prenom_createur', utilisateur.prenom
                )
            ) AS tutos
        FROM tuto
        INNER JOIN utilisateur ON tuto.id_utilisateur = utilisateur.id_utilisateur`;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            data = data.map(item => ({
                tutos: JSON.parse(item.tutos)
            }))
            return res.status(200).json({ "status": "success", "data": data[0]});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

module.exports = { getById, getAll };