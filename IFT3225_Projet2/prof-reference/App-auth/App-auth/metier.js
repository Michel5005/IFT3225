const Produit = require('./produit');

exports.creerProduit = (req, res, next) => {
  const produit = new Produit({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category_id: req.body.category_id
  });
  produit.save()
    .then(() => { res.status(201).json({ message: 'Produit créé!' });})
    .catch((error) => { res.status(400).json({ error: error }); });
};

exports.lireProduit = (req, res, next) => {
  Produit.findOne({
    _id: req.params.id
  })
    .then((produit) => { res.status(200).json(produit);})
    .catch((error) => { res.status(404).json({ error: error });});
};

exports.modifierProduit = (req, res, next) => {
  const produit = new Produit({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category_id: req.body.category_id
  });
  Produit.updateOne({_id: req.params.id}, produit)
    .then(() => { res.status(201).json({ message: 'Produit mis à jour!' });})
    .catch((error) => { res.status(400).json({ error: error });});
};

exports.supprimerProduit = (req, res, next) => {
  Produit.deleteOne({_id: req.params.id})
    .then(() => { res.status(200).json({ message: 'Supprimé!' });})
    .catch((error) => { res.status(400).json({ error: error });});
};

exports.lireTous = (req, res, next) => {
  Produit.find()
    .then((produits) => { res.status(200).json(produits);})
    .catch((error) => { res.status(400).json({ error: error });});
};

exports.chercheProduit = (req, res, next) => {
  Produit.find({ name: { $regex: req.params.n }})
    .then((produits) => { res.status(200).json(produits);})
    .catch((error) => { res.status(400).json({ error: error });});
};