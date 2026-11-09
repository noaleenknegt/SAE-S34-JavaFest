const express = require('express');
const controleur = require('../controllers/articles.controller');

const router = express.Router();

router.get('/get', controleur.getArticles)

module.exports = router