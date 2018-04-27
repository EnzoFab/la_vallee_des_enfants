
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'LaValleeDesEnfants',
    password: '123456',
    port: 5433
})
client.connect()

module.exports = {
    authentification: {
        //  On assigne au jwt token un string secret seulement connu par le serveur pour vérifier si le jwt token est valide
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}

module.exports = client
