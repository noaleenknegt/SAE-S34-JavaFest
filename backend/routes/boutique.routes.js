const express = require('express');
const controleur = require('../controllers/boutique.controller');

const router = express.Router();

router.get('/', controleur.getArticles)

module.exports = router