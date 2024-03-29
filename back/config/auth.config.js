const jwt = require('jsonwebtoken');

const secretKey = 'hhp6x{[Ie,$U-1W65Xz6p&IZT}zR{3';

const generateToken = (user) => {
    return jwt.sign(user, secretKey, { expiresIn: '3h' });
};

const getIdUtilisateurInToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                reject(null);
            } else {
                resolve(user.id_utilisateur);
            }
        });
    });
}

const verifToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ "status": "error", "errorCode": 401, "message": "Acces non autorisé"});
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ "status": "error", "errorCode": 403, "message": "Token expiré" });
            }
            return res.status(403).json({ "status": "error", "errorCode": 403, "message": "Acces non autorisé"});
        }
        next();
    });
};

const verifMyAccToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ "status": "error", "errorCode": 401, "message": "Acces non autorisé"});
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ "status": "error", "errorCode": 403, "message": "Token expiré" });
            }
            return res.status(403).json({ "status": "error", "errorCode": 403, "message": "Acces non autorisé"});
        }
        if (user.est_admin == 1) {
            next();
        }
        if (req.params.id != user.id_utilisateur && req.body.id_utilisateur != user.id_utilisateur) {
            return res.status(403).json({ "status": "error", "errorCode": 403, "message": "Acces non autorisé"})
        }
        next();
    });
};

const verifAdminToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ "status": "error", "errorCode": 401, "message": "Acces non autorisé"});
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ "status": "error", "errorCode": 403, "message": "Token expiré" });
            }
            return res.status(403).json({ "status": "error", "errorCode": 403, "message": "Acces non autorisé"});
        }
        if (user.est_admin != 1) {
            return res.status(403).json({ "status": "error", "errorCode": 403, "message": "Acces non autorisé" })
        }
        next();
    });
};

module.exports = { generateToken, getIdUtilisateurInToken, verifToken, verifMyAccToken, verifAdminToken };