const bdd = require('../config/bdd.config.js');

const getAll = async (req, res) => {
    try {
        const query = `SELECT * FROM categorie`;
        bdd.query(query, (err, data) => {
            if (err) {
                throw err;
            }
            data = data.map(item => {
                return {
                    id_categorie: item.id_categorie,
                    nom: item.nom,
                    url: `images/categorie/${item.id_categorie}.${item.ext_image}`
                }
            })
            return res.status(200).json({ "status": "success", "data": data});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
};

const add = async (req, res) => {
    try {
        // ! A VOIR COMMENT ENVOYER DES IMAGE AU BACK ET LES STOCKER
        const { nom, img } = req.body
        const query = ``;
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
}

const remove = async (req, res) => {
    try {
        // ! MODIF LA BDD POUR DELETE EN CASCADE
        bdd.query(`SELECT ext_image FROM categorie WHERE id_categorie = ?;`, [req.params.id], (err, data) => {
            if (err) {
                throw err;
            }
            const ext_image = data[0].ext_image
            bdd.query(`DELETE FROM categorie WHERE id_categorie = ?;`, [req.params.id], (err, data) => {
                if (err) {
                    throw err;
                }

                var fs = require('fs');
                fs.unlinkSync(`upload/categorie/${req.params.id}.${ext_image}`);
    
                return res.status(200).json({ "status": "success", "message": "La catégorie a été supprimée avec succès"});
            });
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

module.exports = { getAll, add, remove };