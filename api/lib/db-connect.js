
var config = require('config');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
});

module.exports = connection;
