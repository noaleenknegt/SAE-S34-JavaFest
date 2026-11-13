const service = require ('../services/billetterie.service')

// GET /api/billetterie
function getPass(req, res, next) {
    service.getPass()
        .then((pass) => res.json(pass))
        .catch(next);
}

module.exports = {getPass}