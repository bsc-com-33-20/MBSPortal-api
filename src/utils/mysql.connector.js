const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config()

const options = {
    host: "localhost",
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    connectionLimit: 100,
}

const connection = mysql.createConnection(options)

module.exports = connection