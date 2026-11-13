
const service = require('../services/boutique.service');

// GET /api/boutique
function getArticles(req, res, next){
    service.getArticles()
        .then((articles) => res.json(articles))
        .catch(next)
}

module.exports = {getArticles}
