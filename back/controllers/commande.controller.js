const { getIdUtilisateurInToken } = require("../config/auth.config");
const { getDateActu } = require("../functions/getDateActu");

const getAll = async (req, res) => {
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

const getPanier = async (req, res) => {
    try {
        const id_utilisateur = getIdUtilisateurInToken();
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

const createPanier = async (req, res) => {
    try {
        const { list_produit } = req.body;
        // list_produit: [ {id_produit, quantite_commander}, ...]
        bdd.query(`BEGIN;`, (err, data) => {
            if (err) {
                throw err;
            }
            bdd.query(`INSERT INTO commande (date_commande, id_utilisateur) VALUES (?, ?);`, [getDateActu(), getIdUtilisateurInToken()], (err, data) => {
                if (err) {
                    throw err;
                }
                bdd.query(`SELECT LAST_INSERT_ID() AS id_commande;`, (err, data) => {
                    if (err) {
                        throw err;
                    }
                    const id_commande = data[0].id_commande;
                    bdd.query(`INSERT INTO commande_satut_association (id_commande, id_statut, date_statut) VALUES (?, ?, ?)`, [id_commande, 1, getDateActu()], (err, data) => {
                        if (err) {
                            throw err;
                        }
                        for (let i = 0; i < list_produit.length; i++) {
                            const element = list_produit[i];
                            bdd.query(`INSERT INTO commande_produit_association (id_commande, id_produit, quantite_commander) VALUES (?, ?, ?);`, 
                                [id_commande, list_produit[i].id_produit, list_produit[i].quantite_commander], (err, data) => {
                                if (err) {
                                    throw err;
                                }
                            });
                            if (i == list_produit.length) {
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
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({ "status": "success", "data": data[0]});
        });
    } catch (error) {
        console.log(error);
        bdd.query(`ROLLBACK;`);
        return res.json(error);
    }
}

const updatePanier = async (req, res) => {
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

const removePanier = async (req, res) => {
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

const commanderPanier = async (req, res) => {
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

module.exports = { getAll, getPanier, createPanier, updatePanier, removePanier, commanderPanier }