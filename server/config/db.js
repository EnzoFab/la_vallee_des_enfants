// configuration bd locale
var localParam = {
    user: 'postgres', //env var: PGUSER
    database: 'LaValleeDesEnfants', //env var: PGDATABASE
    password: 'pgadmin', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
};

module.exports.bd_conf_locale = localParam;