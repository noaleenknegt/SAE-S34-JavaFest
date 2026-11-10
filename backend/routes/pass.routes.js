const express = require('express')
const controleur = require('../controllers/pass.controller')

const router = express.Router();

router.get('/get', controleur.getPass)

module.exports = router