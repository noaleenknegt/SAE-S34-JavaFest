
const service = require('../services/articles.service');


function getArticles(req, res, next){
    service.getArticles()
        .then((articles) => res.json(articles))
        .catch(next)
}

module.exports = {getArticles}
