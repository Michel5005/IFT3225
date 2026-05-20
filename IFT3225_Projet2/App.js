const express = require('express');
const mongoose = require('mongoose');
const Produit = require('./produit');
const profileRoutes = require('./profileRoutes');
const auth = require('./auth');


// MongoDB connection
mongoose.connect("mongoAPI")
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !', error));

const app = express();
app.use(express.json());


// Revision examen: Middleware => (req, res, next) | ex. app.use((req, res, next) => {
//   - Execute chaque requête
//   - Fait qqchose (modifier requete, check auth, etc.)
//   - Appelle next() pour passer contrôle au prochain
//   - N'envoie pas de réponse, fait juste son travail et passe au prochain

// Revision examen: Route Mounting => ('/user', routesUser)
//   - Pointe vers fichier (ex. routesUser défini comme userRoutes.js dans les requires)
//   - "Pour chaque requête à /user/*, utiliser routes définies dans routesUser"
//   - Le (req, res, next) handler se trouve dans le fichier (ici dans fichier userRoutes.js)

// Revision examen: Handler Route Direct => (req, res, next) ex.: app.post('/product', (req, res, next) => {
//   - Gère une route spécifique directement dans le code


// Middlewares
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next(); 
  });

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

// Routes

app.use('/profils', profileRoutes);

app.post('/product', auth, (req, res, next) => { 
delete req.body._id; 
const produit = new Produit({ 
      ...req.body 
    }); 
    produit.save() 
      .then(() => res.status(201).json({ message: 'Objet enregistré !'})) 
      .catch(error => res.status(400).json({ error })); 
}); 

app.get('/product', auth, (req, res) => { 
    Produit.find() 
        .then(produits => res.status(200).json(produits)) 
        .catch(error => res.status(400).json({ error }));
}); 

module.exports = app;
