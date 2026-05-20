    const jwt = require('jsonwebtoken');


module.exports = (req, res, next)=> {
    try{
        const token = req.headers.authorization;
        const decodeToken = jwt.verify(token, 'PHRASE_ALEATOIRE_TRES_LONGUE');
        const userId = decodeToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    }catch(error){
        res.status(401).json([ error ]);
    }
};