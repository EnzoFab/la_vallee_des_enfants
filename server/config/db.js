
const { Client } = require('pg')
// TODO penser à modiifier le .env
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: 5432,
})
client.connect()

module.exports = client;