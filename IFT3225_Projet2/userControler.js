const User = require('./user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const { pseudo, email, password, isAdmin } = req.body;

    User.findOne({ email })
        .then(existing => {
            if (existing) {
                throw { status: 400, message: "Cette adresse courriel est déjà utilisée !" };
            }

            return fetch(`https://api.zeruh.com/v1/verify?api_key=e543b66b4f43c04c16ae18d58f1e34571cc66fdc859391e239e848f82b9d2bd8&email_address=${email}`);
        })
        .then(response => response.json())
        .then(data => {

            const deliverable = data.result?.status === "deliverable";

            if (!deliverable) {
                throw { status: 400, message: "Email invalide" };
            }
            return bcrypt.hash(password, 10);
        })
        .then(hash => {
            const user = new User({
                pseudo,
                email,
                password: hash,
                isAdmin: !!isAdmin
            });
            return user.save();
        })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => {

            if (error.code === 11000) {
                if (error.keyPattern?.pseudo) {
                    return res.status(400).json({ message: "Ce pseudonyme est déjà utilisé !" });
                }
                if (error.keyPattern?.email) {
                    return res.status(400).json({ message: "Cette adresse courriel est déjà utilisée !" });
                }
            }

            if (error.errors?.pseudo?.kind === "unique") {
                return res.status(400).json({ message: "Ce pseudonyme est déjà utilisé !" });
            }

            if (error.errors?.email?.kind === "unique") {
                return res.status(400).json({ message: "Cette adresse courriel est déjà utilisée !" });
            }

            if (error.status) {
                return res.status(error.status).json({ message: error.message });
            }

            res.status(500).json({ error });
        });
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
            }
            return bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        pseudo: user.pseudo,
                        isAdmin: user.isAdmin,
                        token: jwt.sign(
                            {
                                userId: user._id,
                                isAdmin: user.isAdmin
                            },
                            'PHRASE_ALEATOIRE_TRES_LONGUE',
                            { expiresIn: '24h' }
                        )
                    });
                });
        })
        .catch(error => res.status(500).json({ error }));

};

exports.getAllUsers = (req, res) => {
    User.find()
        .select('-password')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ error });
        })
};

exports.getUserById = (req, res) => {
    const reqId = req.params.id;
    const authId = req.auth.userId;
    const isAdmin = req.auth.isAdmin;

    if (!isAdmin && reqId !== authId) {
        return res.status(403).json({ message: "Accès refusé" });
    }

    User.findById(reqId)
        .select('-password')
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé " });
            }
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ error });
        })
};

exports.updateUser = async (req, res) => {
    const reqId = req.params.id;
    const authId = req.auth.userId;
    const isAdmin = req.auth.isAdmin;

    if (!isAdmin && reqId !== authId) {
        return res.status(403).json({ message: "Accès refusé" });
    }

    try {
        const updateData = { ...req.body };

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            reqId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.deleteUser = (req, res) => {
    const reqId = req.params.id;

    let deletedUser = null;

    User.findById(reqId)
        .select('-password')
        .then(user => {
            if (!user) {
                throw { status: 404, message: "Utilisateur non trouvé" };
            }

            deletedUser = user;

            return User.findByIdAndDelete(reqId);
        })
        .then(() => {
            res.status(200).json({
                message: "Utilisateur supprimé",
                deletedUser: deletedUser
            });
        })
        .catch(error => {
            if (error.status) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ error });
        })
}
