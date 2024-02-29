const bdd = require('../config/bdd.config.js');
const { getIdUtilisateurInToken } = require("../config/auth.config");
const { getDateActu } = require("../functions/getDateActu");

const getAll = async (req, res) => {
    try {
        const query = `
            SELECT 
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id_commande', c.id_commande,
                        'date_commande', c.date_commande,
                        'id_utilisateur', c.id_utilisateur,
                        'statut', (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'date_statut', cs.date_statut,
                                    'nom', s.nom
                                )
                            )
                            FROM commande_statut_association cs
                            INNER JOIN statut s ON cs.id_statut = s.id_statut
                            WHERE cs.id_commande = c.id_commande
                        ),
                        'produits', (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id_produit', p.id_produit,
                                    'nom', p.nom,
                                    'description', p.description,
                                    'prix', p.prix,
                                    'quantite_commande', cp.quantite_commander,
                                    'promo', p.promo,
                                    'date_fin_promo', p.date_fin_promo,
                                    'id_categorie', p.id_categorie
                                )
                            )
                            FROM commande_produit_association cp
                            INNER JOIN produit p ON cp.id_produit = p.id_produit
                            WHERE cp.id_commande = c.id_commande
                        )
                    )
                ) AS result
            FROM commande c;`;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            data = data.map(item => ({
                result: JSON.parse(item.result)
            }));
            return res.status(200).json({ "status": "success", "data": data[0].result});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const getPanier = async (req, res) => {
    try {
        const id_utilisateur = await getIdUtilisateurInToken(req.headers.authorization);
        const query = `
            SELECT 
                JSON_OBJECT(
                    'id_commande', commande.id_commande,
                    'date_commande', commande.date_commande,
                    'produits', (
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id_produit', produit.id_produit,
                                'nom', produit.nom,
                                'description', produit.description,
                                'prix', produit.prix,
                                'quantite_commande', commande_produit_association.quantite_commander,
                                'promo', produit.promo,
                                'date_fin_promo', produit.date_fin_promo,
                                'id_categorie', produit.id_categorie
                            )
                        )    
                    )
                ) AS commande
            FROM commande
            INNER JOIN commande_statut_association ON commande.id_commande = commande_statut_association.id_commande
            INNER JOIN commande_produit_association ON commande.id_commande = commande_produit_association.id_commande
            INNER JOIN produit ON commande_produit_association.id_produit = produit.id_produit
            WHERE commande_statut_association.id_statut = 1
            AND commande.id_utilisateur = ?;`;
        bdd.query(query, id_utilisateur, (err, data) => {
            if (err) {
                throw err;
            }
            data = data.map(item => ({
                commande: JSON.parse(item.commande)
            }));
            return res.status(200).json({ "status": "success", "data": data[0].commande});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const createPanier = async (req, res) => {
    try {
        const { list_produit } = req.body;
        const id_utilisateur = await getIdUtilisateurInToken(req.headers.authorization);
        // list_produit: [ {id_produit, quantite_commander}, ...]
        bdd.query(`BEGIN;`, (err, data) => {
            if (err) {
                throw err;
            }
            bdd.query(`INSERT INTO commande (date_commande, id_utilisateur) VALUES (?, ?);`, [getDateActu(), id_utilisateur], (err, data) => {
                if (err) {
                    throw err;
                }
                bdd.query(`SELECT LAST_INSERT_ID() AS id_commande;`, (err, data) => {
                    if (err) {
                        throw err;
                    }
                    const id_commande = data[0].id_commande;
                    bdd.query(`INSERT INTO commande_statut_association (id_commande, id_statut, date_statut) VALUES (?, ?, ?)`, [id_commande, 1, getDateActu()], (err, data) => {
                        if (err) {
                            throw err;
                        }
                        for (let i = 0; i < list_produit.length; i++) {
                            bdd.query(`INSERT INTO commande_produit_association (id_commande, id_produit, quantite_commander) VALUES (?, ?, ?);`, 
                                [id_commande, list_produit[i].id_produit, list_produit[i].quantite_commander], (err, data) => {
                                if (err) {
                                    throw err;
                                }
                            });
                            if (i+1 == list_produit.length) {
                                bdd.query(`COMMIT;`, (err, data) => {
                                    if (err) {
                                        throw err;
                                    }
                                    return res.status(200).json({ "status": "success", "message": "Le pannier à correctement été ajouté"});
                                });
                            }
                        }
                    });
                });
            });
        });
    } catch (error) {
        console.log(error);
        bdd.query(`ROLLBACK;`);
        return res.json(error);
    }
}

const updatePanier = async (req, res) => {
    try {
        const id_utilisateur = await getIdUtilisateurInToken(req.headers.authorization);
        const { list_produit } = req.body;
        // list_produit: [ {id_produit, quantite_commander}, ...]
        // * remettre tous les produit à chaque fois
        const query = `
        SELECT cs.id_commande
        FROM commande_statut_association cs
        INNER JOIN commande c ON cs.id_commande = c.id_commande
        WHERE cs.id_statut = 1
        AND c.id_utilisateur = ?;`;
        bdd.query(query, [id_utilisateur], (err, data) => {
            if (err) {
                throw err;
            }
            const id_commande = data[0].id_commande;
            bdd.query(`UPDATE commande SET date_commande = ? WHERE id_commande = ?;`, [getDateActu(), id_commande], (err, data) => {
                if (err) {
                    throw err;
                }
                bdd.query(`DELETE FROM commande_produit_association WHERE id_commande = ?;`, [id_commande], (err, data) => {
                    if (err) {
                        throw err;
                    }
                    for (let i = 0; i < list_produit.length; i++) {
                        bdd.query(`INSERT INTO commande_produit_association (id_commande, id_produit, quantite_commander) VALUES (?, ?, ?);`, 
                            [id_commande, list_produit[i].id_produit, list_produit[i].quantite_commander], (err, data) => {
                            if (err) {
                                throw err;
                            }
                        });
                        if (i+1 == list_produit.length) {
                            return res.status(200).json({ "status": "success", "message": "Le pannier à correctement été modifié"});
                        }
                    }
                });
            });
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const removePanier = async (req, res) => {
    try {
        const id_utilisateur = await getIdUtilisateurInToken(req.headers.authorization);
        const query = `
        SELECT commande.id_commande 
        FROM commande
        INNER JOIN commande_statut_association ON commande.id_commande = commande_statut_association.id_commande
        WHERE commande.id_utilisateur = ?
        AND commande_statut_association.id_statut = 1`;
        bdd.query(query, [id_utilisateur], (err, data) => {
            if (err) {
                throw err;
            }
            if (data[0] == undefined) {
                return res.status(403).json({ "status": "success", "message": "Il ni a pas de pannier"});
            } else {
                const id_commande = data[0].id_commande;
                bdd.query("DELETE FROM commande_statut_association WHERE id_commande = ?;", [id_commande], (err, data) => {
                    if (err) {
                        throw err;
                    }
                    bdd.query("DELETE FROM commande_produit_association WHERE id_commande = ?;", [id_commande], (err, data) => {
                        if (err) {
                            throw err;
                        }
                        bdd.query("DELETE FROM commande WHERE id_commande = ?;", [id_commande], (err, data) => {
                            if (err) {
                                throw err;
                            }
                            return res.status(200).json({ "status": "success", "message": "Le pannier à correctement été supprimé"});
                        });
                    });
                });
            }
            
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const commanderPanier = async (req, res) => {
    try {
        const id_utilisateur = await getIdUtilisateurInToken(req.headers.authorization);
        const query = `
        SELECT cs.id_commande
        FROM commande_statut_association cs
        INNER JOIN commande c ON cs.id_commande = c.id_commande
        WHERE cs.id_statut = 1
        AND c.id_utilisateur = ?;`;
        bdd.query(query, [id_utilisateur], (err, data) => {
            if (err) {
                throw err;
            }
            const id_commande = data[0].id_commande;
            bdd.query(`UPDATE commande_statut_association SET id_statut = 2, date_statut = ? WHERE id_statut = 1 AND id_commande = ?;`, [getDateActu(), id_commande], (err, data) => {
                if (err) {
                    throw err;
                }
                return res.status(200).json({ "status": "success", "message": "Le panier à correctement été commandé"});
            });
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

module.exports = { getAll, getPanier, createPanier, updatePanier, removePanier, commanderPanier }