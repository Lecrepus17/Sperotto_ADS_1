const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

    try {
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });

    } catch (err) {
        res.status(401).json({ mensagem: 'Token inválido' });
    }
}

module.exports = authMiddleware;
