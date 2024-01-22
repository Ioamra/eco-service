const bdd = require('../config/bdd.config.js');
const { generateToken } = require('../config/auth.config');
const { getDateActu } = require('../functions/getDateActu.js');

const getUtilisateurById = async (req, res) => {
    try {
        const query = `SELECT * FROM utilisateur WHERE id_utilisateur = ${req.params.id}`;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({ "status": "success", "data": data});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
};

const getUtilisateurs = async (req, res) => {
    try {
        const query = `SELECT id_utilisateur, mail, prenom, nom, pays, ville, code_postal, complement_adresse, est_admin, date_creation, etat FROM utilisateur`;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({ "status": "success", "data": data});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
};

const connexion = async (req, res) => {
    try {
        const { mail, mot_de_passe } = req.body;
        const query = `SELECT COUNT(*) as exist, id_utilisateur, est_admin FROM utilisateur WHERE mail = '${mail}' AND mot_de_passe = '${mot_de_passe}'`;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            if (data[0].exist == 1) {
                const user = {
                    id_utilisateur: data[0].id_utilisateur,
                    est_admin: data[0].est_admin
                };
                return res.status(200).json({ "status": "success", "data": { "token" : generateToken(user)}});
            } else {
                return res.status(401).json({ "status": "error", "errorCode": 401, "message": "Identifiant ou mot de passe invalide"})
            }
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const inscription = async (req, res) => {
    try {
        const { mail, prenom, nom, mot_de_passe, pays, ville, code_postal, complement_adresse } = req.body;
        const query = `INSERT INTO utilisateur (mail, prenom, nom, mot_de_passe, pays, ville, code_postal, complement_adresse, est_admin, date_creation, etat) 
            VALUES ('${mail}', '${prenom}', '${nom}', '${mot_de_passe}', '${pays}', '${ville}', '${code_postal}', '${complement_adresse}', 0, ${getDateActu()}, 1 )`;
        
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            } else {
                return res.status(200).json({ "status": "success", "data": { "token": generateToken(user) } });
            }
        })
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

module.exports = { getUtilisateurById, getUtilisateurs, connexion, inscription };