const bdd = require('../config/bdd.config.js');
const { generateToken } = require('../config/auth.config');

const getUtilisateurById = async (req, res) => {
    const query = `SELECT * FROM utilisateur WHERE id_utilisateur = ${req.params.id}`;
    bdd.query(query, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.status(200).json({ "status": "success", "data": data});
    });
};

const getUtilisateurs = async (req, res) => {
    const query = `SELECT * FROM utilisateur`;
    bdd.query(query, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.status(200).json({ "status": "success", "data": data});
    });
};

const connexion = async (req, res) => {
    const { mail, mot_de_passe } = req.body;
    const query = `SELECT COUNT(*) as exist, id_utilisateur, est_admin FROM utilisateur WHERE mail = '${mail}' AND mot_de_passe = '${mot_de_passe}'`;
    bdd.query(query, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        if (data[0].exist == 1) {
            const user = {
                id_utilisateur: data[0].id_utilisateur,
                est_admin: data[0].est_admin
            };
            return res.status(200).json({ "status": "success", "data": { "token" : generateToken(user)}});
        } else {
            return res.status(401).json({ "status": "error", "message": "Identifiant ou mot de passe incorect"})
        }
    });
}

module.exports = { getUtilisateurById, getUtilisateurs, connexion };