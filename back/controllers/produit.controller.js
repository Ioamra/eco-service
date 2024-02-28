const { getIdUtilisateurInToken } = require('../config/auth.config.js');
const bdd = require('../config/bdd.config.js');
const { getDateActu } = require('../functions/getDateActu.js');

const getById = async (req, res) => {
    try {
        const query = `SELECT 
            JSON_OBJECT(
                'id_produit', produit.id_produit,
                'nom', produit.nom,
                'description', produit.description,
                'quantite', produit.quantite,
                'prix', produit.prix,
                'promo', produit.promo,
                'date_fin_promo', produit.date_fin_promo,
                'note_moyenne', (SELECT AVG(avis.note) FROM avis WHERE avis.id_produit = produit.id_produit)
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
        WHERE produit.id_produit = ?;`;
        bdd.query(query, [req.params.id], (err, data) => {
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

const getAllByCategorie = async (req, res) => {
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
                    'url_img', (SELECT CONCAT('images/produit/', image.id_image, '.', image.ext) FROM image WHERE image.id_produit = produit.id_produit LIMIT 1),
                    'note_moyenne', (SELECT AVG(avis.note) FROM avis WHERE avis.id_produit = produit.id_produit),
                    'nb_produit_commande', (
                        SELECT SUM(commande_produit_association.quantite_commander)
                        FROM commande_produit_association
                        LEFT JOIN commande_satut_association ON commande_produit_association.id_commande = commande_satut_association.id_commande
                        LEFT JOIN statut ON commande_satut_association.id_statut = statut.id_statut
                        WHERE id_produit = produit.id_produit AND statut.nom != ?
                    )
                )
            ) AS produit
        FROM produit
        INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie
        WHERE categorie.id_categorie = ?`;
        bdd.query(query, [req.params.id], (err, data) => {
            if (err) {
                throw err;
            }
            data = data.map(item => ({
                produit: JSON.parse(item.produit)
            }))
            return res.status(200).json({ "status": "success", "data": data[0].produit});
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
                    'id_produit', produit.id_produit,
                    'nom', produit.nom,
                    'description', produit.description,
                    'quantite', produit.quantite,
                    'prix', produit.prix,
                    'promo', produit.promo,
                    'date_fin_promo', produit.date_fin_promo,
                    'url_img', (SELECT CONCAT('images/produit/', image.id_image, '.', image.ext) FROM image WHERE image.id_produit = produit.id_produit LIMIT 1),
                    'note_moyenne', (SELECT AVG(avis.note) FROM avis WHERE avis.id_produit = produit.id_produit),
                    'nb_produit_commande', (
                        SELECT SUM(commande_produit_association.quantite_commander)
                        FROM commande_produit_association
                        LEFT JOIN commande_satut_association ON commande_produit_association.id_commande = commande_satut_association.id_commande
                        LEFT JOIN statut ON commande_satut_association.id_statut = statut.id_statut
                        WHERE id_produit = produit.id_produit AND statut.nom != ?
                    )
                )
            ) AS produit
        FROM produit`;
        bdd.query(query, ['Dans le panier'], (err, data) => {
            if (err) {
                throw err;
            }
            data = data.map(item => ({
                produit: JSON.parse(item.produit)
            }))
            return res.status(200).json({ "status": "success", "data": data[0].produit});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const getBySearch = async (req, res) => {
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
                    'url_img', (SELECT CONCAT('images/produit/', image.id_image, '.', image.ext) FROM image WHERE image.id_produit = produit.id_produit LIMIT 1),
                    'note_moyenne', (SELECT AVG(avis.note) FROM avis WHERE avis.id_produit = produit.id_produit),
                    'nb_produit_commande', (
                        SELECT SUM(commande_produit_association.quantite_commander)
                        FROM commande_produit_association
                        LEFT JOIN commande_satut_association ON commande_produit_association.id_commande = commande_satut_association.id_commande
                        LEFT JOIN statut ON commande_satut_association.id_statut = statut.id_statut
                        WHERE id_produit = produit.id_produit AND statut.nom != ?
                    )
                )
            ) AS produit
        FROM produit
        WHERE produit.nom LIKE ?`;
        bdd.query(query, ['Dans le panier', '%' + req.params.search + '%'], (err, data) => {
            if (err) {
                throw err;
            }
            data = data.map(item => ({
                produit: JSON.parse(item.produit)
            }))
            return res.status(200).json({ "status": "success", "data": data[0].produit});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const add = async (req, res) => {
    try {
        // ! IMG
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

const update = async (req, res) => {
    try {
        const { id_produit, nom, description, quantite, prix, promo, date_fin_promo, id_categorie } = req.body;
        // ! update img
        let query = `UPDATE produit SET `;
        let valueToUpdate = '';
        let values = [];
        if (nom != undefined) {
            valueToUpdate += `nom = ?, `;
            values.push(nom);
        }
         if (description != undefined) {
            valueToUpdate += `description = ?, `;
            values.push(description);
        }
         if (quantite != undefined) {
            valueToUpdate += `quantite = ?, `;
            values.push(quantite);
        }
         if (prix != undefined) {
            valueToUpdate += `prix = ?, `;
            values.push(prix);
        }
         if (promo != undefined) {
            valueToUpdate += `promo = ?, `;
            values.push(promo);
        }
         if (date_fin_promo != undefined) {
            valueToUpdate += `date_fin_promo = ?, `;
            values.push(date_fin_promo);
        }
         if (id_categorie != undefined) {
            valueToUpdate += `id_categorie = ?, `;
            values.push(id_categorie);
        }
         valueToUpdate = valueToUpdate.slice(0, -2);
        query += valueToUpdate + ` WHERE id_produit = ?;`;
        values.push(id_produit);
        bdd.query(query, values, (err, data) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({ "status": "success", "response": "La mise à jour a correctement été éffectué"});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const addAvis = async (req, res) => {
    try {
        const { description, note, id_produit } = req.body;
        const query = `INSERT INTO avis (description, note, date_avis, id_utilisateur, id_produit) VALUES (?, ?, ?, ?, ?)`;
        const id_utilisateur = await getIdUtilisateurInToken(req.headers.authorization);
        bdd.query(query, [description, note, getDateActu(), id_utilisateur, id_produit], (err, data) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({ "status": "success", "message": "L'avis a correctement été ajouté"});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const removeImage = async (req, res) => {
    try {
        const { id_image } = req.body;
        bdd.query(`SELECT ext FROM image WHERE id_image = ?;`, [id_image], (err, data) => {
            if (err) {
                throw err;
            }
            const ext = data[0].ext;
            bdd.query(`DELETE FROM image WHERE id_image = ?;`, [id_image], (err, data) => {
                if (err) {
                    throw err;
                }
                var fs = require('fs');
                fs.unlinkSync(`upload/categorie/${id_image}.${ext}`);
                return res.status(200).json({ "status": "success", "message": "L'image à été supprimé"});
            });
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const addImage = async (req, res) => {
    try {
        const { id_produit } = req.body;

        const ext = req.file.originalname.split('.').pop();


        const query = `INSERT INTO image (id_produit, ext) VALUES (?, ?)`;
        bdd.query(query, [id_produit, ext], (err, data) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({ "status": "success", "message": "Image ajoutée avec succès" });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "status": "error", "message": "Une erreur interne s'est produite" });
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

module.exports = { getById, getAllByCategorie, getBySearch, getAll, add, update, addAvis, removeImage, addImage };