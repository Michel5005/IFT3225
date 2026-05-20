    const jwt = require('jsonwebtoken');


module.exports = (req, res, next)=> {
    try{
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }

        const bearerToken = token.split(' ')[1];

        if (!bearerToken) {
            return res.status(401).json({ message: 'Format de token invalide' });
        }

        const decodeToken = jwt.verify(bearerToken, 'PHRASE_ALEATOIRE_TRES_LONGUE');
        const userId = decodeToken.userId;
        const isAdmin = decodeToken.isAdmin;
        req.auth = {
            userId: userId,
            isAdmin: isAdmin
        };
        next();
    }catch(error){
        res.status(401).json({ message: 'Requête non authentifiée', error });
    }
};