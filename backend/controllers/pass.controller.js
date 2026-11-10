const service = require ('../services/pass.service')

function getPass(req, res) {
    service.getPass()
        .then((pass) => res.json(pass))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        })
}

module.exports = {getPass}