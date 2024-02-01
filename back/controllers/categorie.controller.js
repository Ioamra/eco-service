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
    // try {
    //     // ! MODIF LA BDD POUR DELETE EN CASCADE
    //     const { id_categorie } = req.params.id;
    //     bdd.query(`SELECT * FROM categorie WHERE id_categorie = ?;`, [id_categorie], (err, data) => {
    //         if (err) {
    //             throw err;
    //         }
    //         const nom = data[0].
    //     });
    //     bdd.query(`DELETE FROM categorie WHERE id_categorie = ?;`, [id_categorie], (err, data) => {
    //         if (err) {
    //             throw err;
    //         }

    //         return res.status(200).json({ "status": "success", "data": data[0]});
    //     });
    // } catch (error) {
    //     console.log(error);
    //     return res.json(error);
    // }



    
    // var fs = require('fs');
    // var filePath = 'http://localhost:5000/images/categorie/test.jpg'; 
    // fs.unlinkSync(filePath);
}

module.exports = { getAll, add, remove };