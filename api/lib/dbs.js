var async = require('async');
var c = require('./db-connect');

var deleteLinks = function (datasourceId, cb) {
  c.query("DELETE FROM cfadmin_link WHERE datasource_id = " + c.escape(datasourceId), cb);
};

var dbs = {
  'list': function(cb) {
    c.query("SELECT * FROM cfadmin_datasource ", cb);
  },
  'insert': function(data, cb) {
    c.query("INSERT INTO cfadmin_datasource SET ?", data, cb);
  },
  'update': function(data, cb) {
    c.query("UPDATE cfadmin_datasource SET ? WHERE id = " + c.escape(data.id), data, cb);
  },
  'delete': function(id, cb) {
     async.series([
      function (next) {
        deleteLinks(id, next);
      },
      function(next) {
        c.query("DELETE FROM cfadmin_datasource WHERE id = " + c.escape(id), cb);
      }
    ], cb);
  }
};

module.exports = dbs;