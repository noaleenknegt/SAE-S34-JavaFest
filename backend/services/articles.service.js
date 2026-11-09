const pool = require('../db/pool.js')

const SQL = "SELECT * FROM Articles;"


// return all the active event from the database
async function getArticles(){
    let conn
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