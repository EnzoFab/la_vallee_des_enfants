
const { Client } = require('pg')
const pg = require('pg')
// TODO penser à modifier le .env
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
})
client.connect();

const Moment = require('moment');
const parseDate = function parseDate(val) {
    return val === null ? null : Moment(val).format('YYYY-MM-DD')
};
const types = pg.types;
const DATATYPE_DATE = 1082;
types.setTypeParser(DATATYPE_DATE, function(val) {
    return val === null ? null : parseDate(val)
});

module.exports = client;