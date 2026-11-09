
const service = require('../services/articles.service');


function getArticles(req, res){
    service.getArticles()
        .then((articles) => res.json(articles))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        })
}

module.exports = {getArticles}
