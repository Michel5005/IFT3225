const express = require('express');
const router = express.Router();
const userCtrl = require('./userControler');
const auth = require("./auth");
const isAdmin = require("./isAdmin");

router.get("/motdepasse/:longueur", (req, res) => {
    const longueur = parseInt(req.params.longueur);

    if (isNaN(longueur) || longueur <= 0) {
        return res.status(400).json({ message: "Longueur invalide" });
    }

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < longueur; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    res.json({ motdepasse: password });
});

router.post('/connexion', userCtrl.login);
router.post('/', userCtrl.signup);

router.get('/', auth, isAdmin, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getUserById);
router.put('/:id', auth, userCtrl.updateUser);
router.delete('/:id', auth, isAdmin, userCtrl.deleteUser);


module.exports = router;