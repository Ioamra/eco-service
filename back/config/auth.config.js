const jwt= require('jsonwebtoken');

const secretKey = 'hhp6x{[Ie,$U-1W65Xz6p&IZT}zR{3';

const generateToken = (user) => {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Le token a expiré, peut-être envisager un renouvellement
                // ou un autre mécanisme selon vos besoins
                return res.status(403).json({ error: 'Token expired' });
            }
            return res.sendStatus(403); // Forbidden pour d'autres erreurs
        }
        req.user = user;
        next();
    });
};


module.exports = { generateToken, authenticateToken };