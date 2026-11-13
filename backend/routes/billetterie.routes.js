const express = require('express')
const controleur = require('../controllers/billetterie.controller')

const router = express.Router();

router.get('/', controleur.getPass)

module.exports = router