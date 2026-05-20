module.exports = (req, res, next) => {
    if (!req.auth || !req.auth.isAdmin) {
        return res.status(403).json({ message: "Accès réservé aux admins" });
    }
    next();
};