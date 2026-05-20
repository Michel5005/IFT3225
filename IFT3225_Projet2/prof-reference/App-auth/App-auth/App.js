const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routesProduits = require('./routeur');
const routesUser = require('./userRoutes');

mongoose.connect('mongodb+srv://admindb:UeReOVgEKqMuxnHu@cluster0.byhuxkg.mongodb.net/?appName=Cluster0')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !' + error));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/product', routesProduits);
app.use('/user', routesUser);

module.exports = app;
