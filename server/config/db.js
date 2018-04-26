
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'LaValleeDesEnfants',
    password: '123456',
    port: 5433,
})
client.connect()

module.exports = client
