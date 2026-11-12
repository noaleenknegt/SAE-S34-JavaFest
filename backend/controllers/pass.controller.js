const service = require ('../services/pass.service')

function getPass(req, res, next) {
    service.getPass()
        .then((pass) => res.json(pass))
        .catch(next);
}

module.exports = {getPass}