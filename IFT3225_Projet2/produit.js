const mongoose = require('mongoose');

const produit = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category_id: { type: Number, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Produit', produit);