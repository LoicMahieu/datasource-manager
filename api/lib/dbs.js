var async = require('async');

var c = require('./db-connect');
var links = require('./links');

var dbs = {
  'list': function(cb) {
    c.query("SELECT * FROM datasource ", cb);
  },
  'insert': function(data, cb) {
    c.query("INSERT INTO datasource SET ?", data, cb);
  },
  'update': function(data, cb) {
    c.query("UPDATE datasource SET ? WHERE id = " + c.escape(data.id), data, cb);
  },
  'delete': function(id, cb) {
     async.series([
      function (next) {
        links.deleteByDB(id, next);
      },
      function(next) {
        c.query("DELETE FROM datasource WHERE id = " + c.escape(id), cb);
      }
    ], cb);
  }
};

module.exports = dbs;