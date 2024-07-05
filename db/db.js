// Instalar dotenv: npm i dontenv
const mysql = require('mysql2')

const connection = mysql.createConnection({
    //----------datos para utilizar aplicación en en webhost
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    connectionLimit: 5

    // ---------datos para utilizar aplicación en localhost
    // host: 'localhost',
    // user: 'root',
    // password: 'root',
    // database: 'shoes_db'
})

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err)
        return
    }
    console.log('Connected to the database')
})

module.exports = connection