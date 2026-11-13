const pool = require('../db/pool.js')

async function getPass(){
    let conn;
    const SQL = "SELECT id_pass, nom_pass, prix, quantite_restante FROM Pass";
    try {
        conn = await pool.getConnection()
        const pass = await conn.query(SQL);
        console.log(pass);
        return pass;
    } catch (err) {
        throw err
    } finally {
        if (conn) await conn.release()
    }
}

module.exports = { getPass }