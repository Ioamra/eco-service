const { getIdUtilisateurInToken } = require('../config/auth.config.js');
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

const addAvis = async (req, res) => {
    try {
        const { description, note, id_tuto } = req.body;
        const query = `INSERT INTO avis (description, note, date_avis, id_utilisateur, id_tuto) VALUES (?, ?, ?, ?, ?)`;
        const id_utilisateur = await getIdUtilisateurInToken(req.headers.authorization);
        bdd.query(query, [description, note, getDateActu(), id_utilisateur, id_tuto], (err, data) => {
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

const add = async (req, res) => {
    try {
        // ! AJOUETER IMG
        const { titre, description, ext_image, video, list_id_produit } = req.body;
        const id_utilisateur = await getIdUtilisateurInToken(req.headers.authorization);
        if (video != undefined) {
            const query = `INSERT INTO tuto (titre, description, ext_image, video, date_tuto, id_utilisateur) VALUES (?, ?, ?, ?, ?, ?)`;
            bdd.query(query, [titre, description, ext_image, video, getDateActu(), id_utilisateur], (err, data) => {
                if (err) {
                    throw err;
                } else {
                    bdd.query("SELECT LAST_INSERT_ID() AS id_tuto;", (err, data) => {
                        if (err) {
                            throw err;
                        } else {
                            const id_tuto = data[0].id_tuto;
                            for (let i = 0; i < list_id_produit.length; i++) {
                                bdd.query(`INSERT INTO tuto_produit_association (id_produit, id_tuto) VALUES (?, ?)`, [list_id_produit[i], id_tuto], (err, data) => {
                                    if (err) {
                                        throw err;
                                    }
                                })
                                if (i == list_id_produit.length) {
                                    return res.status(200).json({ "status": "success", "data": data[0]});
                                }
                            }
                        }
                    })
                }
            });
        } else {
            const query = `INSERT INTO tuto (titre, description, ext_image, date_tuto, id_utilisateur) VALUES (?, ?, ?, ?, ?)`;
            bdd.query(query, [titre, description, ext_image, getDateActu(), id_utilisateur], (err, data) => {
                if (err) {
                    throw err;
                } else {
                    bdd.query("SELECT LAST_INSERT_ID() AS id_tuto;", (err, data) => {
                        if (err) {
                            throw err;
                        } else {
                            const id_tuto = data[0].id_tuto;
                            for (let i = 0; i < list_id_produit.length; i++) {
                                bdd.query(`INSERT INTO tuto_produit_association (id_produit, id_tuto) VALUES (?, ?)`, [list_id_produit[i], id_tuto], (err, data) => {
                                    if (err) {
                                        throw err;
                                    }
                                })
                                if (i == list_id_produit.length) {
                                    return res.status(200).json({ "status": "success", "data": data[0]});
                                }
                            }
                        }
                    })
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const remove = async (req, res) => {
    try {
        const { id_tuto } = req.body;
        bdd.query(`SELECT ext_image FROM tuto WHERE id_tuto = ?;`, [id_tuto], (err, data) => {
            if (err) {
                throw err;
            }
            const ext_image = data[0].ext_image
            bdd.query(`DELETE FROM tuto WHERE id_tuto = ?;`, [id_tuto], (err, data) => {
                if (err) {
                    throw err;
                }

                var fs = require('fs');
                fs.unlinkSync(`upload/tuto/${id_tuto}.${ext_image}`);
    
                return res.status(200).json({ "status": "success", "message": "La catégorie a été supprimée avec succès"});
            });
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

module.exports = { getById, getAll, addAvis, add, remove };