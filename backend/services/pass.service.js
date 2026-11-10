const pool = require('../db/pool.js')

const SQL = "SELECT id_pass, nom_pass, prix, quantite_restante FROM Pass";
async function getPass(){
    let conn;
    try {
        conn = await pool.getConnection()
        const pass = await conn.query(SQL);
        console.log(pass);
        return pass;
    } catch (err) {
        throw err
    } finally {
        if (conn) await conn.end()
    }
}

module.exports = { getPass }