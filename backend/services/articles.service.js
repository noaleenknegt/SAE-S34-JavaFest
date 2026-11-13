const pool = require('../db/pool.js')


async function getArticles(){
    let conn
    const SQL = "SELECT * FROM Articles;"
    try{
        conn = await pool.getConnection()
        const contact = await conn.query(SQL)
        console.log(contact)
        return contact
    } catch (err) {
        throw err
    } finally {
        if (conn) await conn.end()
    }
}


module.exports = { getArticles }