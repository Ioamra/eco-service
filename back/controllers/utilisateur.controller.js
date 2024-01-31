const bdd = require('../config/bdd.config.js');
const { generateToken } = require('../config/auth.config');
const { getDateActu } = require('../functions/getDateActu.js');

const getUtilisateurById = async (req, res) => {
    try {
        const query = `SELECT * FROM utilisateur WHERE id_utilisateur = ${req.params.id};`;
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
        const query = `SELECT id_utilisateur, mail, prenom, nom, pays, ville, code_postal, complement_adresse, est_admin, date_creation, etat FROM utilisateur;`;
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
        const query = `SELECT COUNT(*) as exist, id_utilisateur, est_admin, etat FROM utilisateur WHERE mail = '${mail}' AND mot_de_passe = '${mot_de_passe}';`;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            if (data[0].exist == 1) {
                if (data[0].etat == 0) {
                    return res.status(200).json({ "status": "success", "message": "Le compte à été banni"});
                }
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
        bdd.query(`SELECT COUNT(mail) AS mail_exist FROM utilisateur WHERE mail = '${mail}'`, (err, data) => {
            if (err) {
                throw err;
            } else {
                if (data[0].mail_exist) {
                    return res.status(409).json({ "status": "error", "errorCode": 409, "message": "Cette adresse mail est déjà utilisé." });
                }
            }
        });

        const query = `INSERT INTO utilisateur (mail, prenom, nom, mot_de_passe, pays, ville, code_postal, complement_adresse, est_admin, date_creation, etat) 
            VALUES ('${mail}', '${prenom}', '${nom}', '${mot_de_passe}', '${pays}', '${ville}', '${code_postal}', '${complement_adresse}', 0, '${getDateActu()}', 1 );`;

        bdd.query(query, (err, data) => {
            console.log(data);
            if (err) {
                throw err;
            } else {
                bdd.query("SELECT LAST_INSERT_ID() AS id_utilisateur;", (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        const user = {
                            id_utilisateur: data[0].id_utilisateur,
                            est_admin: 0
                        };
                        return res.status(200).json({ "status": "success", "data": { "token": generateToken(user) } });
                    }
                })
            }
        })
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}


const update = async (req, res) => {
    try {
        bdd.query(`SELECT COUNT(mail) AS mail_exist FROM utilisateur WHERE mail = '${mail}'`, (err, data) => {
            if (err) {
                throw err;
            } else {
                if (data[0].mail_exist) {
                    return res.status(409).json({ "status": "error", "errorCode": 409, "message": "Cette adresse mail est déjà utilisé." });
                }
            }
        });

        const { id_utilisateur, mail, prenom, nom, mot_de_passe, pays, ville, code_postal, complement_adresse, ancient_mote_de_passe } = req.body;
        let query = `UPDATE utilisateur SET `;
        let valueToUpdate = '';
        if (mail != undefined) valueToUpdate += `mail = '${mail}', `;
        if (prenom != undefined) valueToUpdate += `prenom = '${prenom}', `;
        if (nom != undefined) valueToUpdate += `nom = '${nom}', `;
        if (mot_de_passe != undefined) valueToUpdate += `mot_de_passe = '${mot_de_passe}', `;
        if (pays != undefined) valueToUpdate += `pays = '${pays}', `;
        if (ville != undefined) valueToUpdate += `ville = '${ville}', `;
        if (code_postal != undefined) valueToUpdate += `code_postal = '${code_postal}', `;
        if (complement_adresse != undefined) valueToUpdate += `complement_adresse = '${complement_adresse}',`;
        valueToUpdate = valueToUpdate.slice(0, -2);
        query += valueToUpdate + ` WHERE mot_de_passe = '${ancient_mote_de_passe}' AND id_utilisateur = ${id_utilisateur};`;
        bdd.query(query, (err, data) => {
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

const toggleAdminRole = async (req, res) => {
    try {
        const { id_utilisateur } = req.body;
        const query = `UPDATE utilisateur
            SET est_admin = CASE
                WHEN est_admin = 0 THEN 1
                WHEN est_admin = 1 THEN 0
            END
        WHERE id_utilisateur = ${id_utilisateur};`;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({ "status": "success", "response": "Le role admin à été modifié"});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const toggleBanUnban = async (req, res) => {
    try {
        const { id_utilisateur } = req.body;
        const query = `UPDATE utilisateur
            SET etat = CASE
                WHEN etat = 0 THEN 1
                WHEN etat = 1 THEN 0
            END
        WHERE id_utilisateur = ${id_utilisateur};`;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({ "status": "success", "response": "L'état de l'utilisateur à été modifié"});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

module.exports = { getUtilisateurById, getUtilisateurs, connexion, inscription, update, toggleAdminRole, toggleBanUnban };