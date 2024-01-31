const bdd = require('../config/bdd.config.js');

const getAllCategorie = async (req, res) => {
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
                    url: `images/categorie/${item.nom}.${item.ext_image}`
                }
            })
            return res.status(200).json({ "status": "success", "data": data});
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
};

const addCategorie = async (req, res) => {
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

module.exports = { getAllCategorie, addCategorie };