
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost'
    , database : 'igloo_cfadmin' 
    , user : 'root'
    , password : 'igloo'
});

module.exports = connection;
