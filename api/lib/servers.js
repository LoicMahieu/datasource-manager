  
var _ = require('lodash');
var async = require('async');

var c = require('./db-connect');
var links = require('./links');

var servers = {
  'list': function(cb) {
    c.query(([ 
      'SELECT s.*, IFNULL(GROUP_CONCAT(datasource_id), \'\') as datasourceIds',
      'FROM server s',
      'LEFT JOIN link_server_datasource ON server_id = s.id',
      'GROUP BY s.id',
    ]).join(' '), function(err, rows) {
      if( err ) cb(err);

      rows.forEach(function(row) {
        if( row.datasourceIds.length <= 0 ) {
          row.datasourceIds = [];
        } else {
          row.datasourceIds = _.map(row.datasourceIds.split(','), function(id) {
            return Number(id);
          });
        }
      });

      cb(err, rows);
    });
  },

  'insert': function(data, cb) {
    delete data.datasourceIds;
    c.query("INSERT INTO server SET ?", data, cb);
  },

  'update': function(data, cb) {
    var ids = data.datasourceIds;
    delete data.datasourceIds;

    async.series([
      function(next) {
        c.query("UPDATE server SET ? WHERE id = " + c.escape(data.id), data, next);
      },
      function(next) {
        links.deleteByServer(data.id, next);
      },
      function(next) {
        if( !ids.length ) {
          next();
          return;
        }

        var q = "INSERT INTO link_server_datasource (server_id, datasource_id) VALUES ";

        q += _.map(ids, function(id) {
          return "( " + c.escape(data.id) + ", " + c.escape(id) + " )";
        }).join(',');
        
        c.query(q, cb);
      }],
      cb
    );
  },

  'delete': function(id, cb) {
    async.series([
      function (next) {
        links.deleteByServer(id, next);
      }, 
      function (next) {
        c.query("DELETE FROM server WHERE id = " + c.escape(id), next);
      }
    ], cb);
  }
};

module.exports = servers;