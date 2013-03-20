  
var _ = require('lodash');
var async = require('async');
var c = require('./db-connect');


var deleteServerDBs = function (serverId, cb) {
  c.query("DELETE FROM cfadmin_link WHERE server_id = " + c.escape(serverId), cb);
};

var servers = {
  'list': function(cb) {
    c.query(([ 
      'SELECT s.*, IFNULL(GROUP_CONCAT(datasource_id), \'\') as datasourceIds',
      'FROM cfadmin_server s',
      'LEFT JOIN cfadmin_link ON server_id = s.id',
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
          console.log("list servers - ids : " + row.datasourceIds);
        }
      });

      cb(err, rows);
    });
  },
  'insert': function(data, cb) {
    delete data.datasourceIds;
    c.query("INSERT INTO cfadmin_server SET ?", data, cb);
  },
  'update': function(data, cb) {
    var ids = data.datasourceIds;
    console.log("update servers - ids : " + ids);
    delete data.datasourceIds;

    async.series([
      function(next) {
        c.query("UPDATE cfadmin_server SET ? WHERE id = " + c.escape(data.id), data, next);
      },
      function(next) {
        deleteServerDBs(data.id, next);
      },
      function(next) {
        if( !ids.length ) {
          next();
          return;
        }

        var q = "INSERT INTO cfadmin_link (server_id, datasource_id) VALUES "
          , values = [];

        ids.forEach(function(id) {
          values.push(["( " + c.escape(data.id) + ", " + c.escape(id) + " )"]);
        });

        q += values.join(',');
        
        c.query(q, cb);
      }],
      cb
    );
  },
  'delete': function(id, cb) {
    async.series([
      function (next) {
        deleteServerDBs(id, next);
      }, 
      function (next) {
        c.query("DELETE FROM cfadmin_server WHERE id = " + c.escape(id), next);
      }
    ], cb);
  }

};

function loadIds(err, ids, row, undefined) {
  var datasourceIds = [];
  if(ids === undefined)
    ids = [];
  else
    var datasourceIds = [];
    for(var i = 0 ; i < ids.length ; i++)
      datasourceIds.push(ids);
    row.datasourceIds = datasourceIds;
    console.log(row);
}

module.exports = servers;