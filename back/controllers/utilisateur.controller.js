const bdd = require("../config/bdd.config.js");

const getUtilisateurById = async (req, res) => {
    const query = `SELECT * FROM utilisateur WHERE id_utilisateur = ${req.params.id}`;
    bdd.query(query, (err, data) => {
        if (err) {
        console.log(err);
        return res.json(err);
        }
        return res.status(200).json(data);
    });
};

const getUtilisateurs = async (req, res) => {
    const query = `SELECT * FROM utilisateur`;
    bdd.query(query, (err, data) => {
        if (err) {
        console.log(err);
        return res.json(err);
        }
        return res.status(200).json(data);
    });
};

module.exports = { getUtilisateurById, getUtilisateurs };