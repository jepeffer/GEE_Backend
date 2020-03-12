var mysql = require('mysql');
var util = require('util')

var pool = mysql.createPool({
    connectionLimit: 500,
    host: 'localhost',
    user: 'foo',
    password: 'bar',
    database: 'GEE_DB'
    });

pool.query = util.promisify(pool.query);

module.exports = pool;