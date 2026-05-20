const express = require('express');
const router = express.Router();
const controleur = require('./metier');
const auth = require('./auth');

router.get('/', auth, controleur.lireTous);
router.post('/', auth, controleur.creerProduit);
router.get('/:id', auth, controleur.lireProduit);
router.put('/:id', auth, controleur.modifierProduit);
router.delete('/:id', auth, controleur.supprimerProduit);
router.get('/s/:n', auth, controleur.chercheProduit);

module.exports = router;