const bdd = require("../config/bdd.config.js");

const getUserById = async (req, res) => {
    const query = `SELECT * FROM users WHERE id_user = ${req.params.id}`;
    bdd.query(query, (err, data) => {
        if (err) {
        console.log(err);
        return res.json(err);
        }
        return res.status(200).json(data);
    });
};

const getUsers = async (req, res) => {
    const query = `SELECT * FROM users`;
    bdd.query(query, (err, data) => {
        if (err) {
        console.log(err);
        return res.json(err);
        }
        return res.status(200).json(data);
    });
};

module.exports = { getUserById, getUsers };
