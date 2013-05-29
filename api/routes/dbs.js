
var dbs = require('../lib/dbs');
var util = require('./utils');
var send = util.send;
var formatRows = util.formatRows;

var formatTable = [
    'pooling',
    'disable',
    'enable_clob',
    'enable_blob',
    'enablemaxconnections',
    'disable_autogenkeys',
    'alter',
    'grant',
    'update',
    'delete',
    'create',
    'storedproc',
    'insert',
    'drop',
    'revoke',
    'select'
  ];


module.exports = function(ns, app) {
  app.get(ns + 'datasources', function (req, res) {
    dbs.list(function (err, rows) {
      if (err) throw err;

      rows = formatRows(rows, formatTable);
      send(res, rows);
    });
  });
  
  app.post(ns + 'datasources', function (req, res) {
    dbs.insert(req.body, function (err, info) {
      if (err) throw err;

      send(res, {
        'id': info.insertId
      });
    });
  });

  app.put(ns + 'datasources/:id', function (req, res) {
    dbs.update(req.body, function(err, info) {
      if (err) throw err;

      send(res, {
        'id': req.body.id
      });
    });
  });

  app.delete(ns + 'datasources/:id', function (req, res) {
    dbs.delete(req.params.id, function (err, info) {
      if (err) throw err;
      send(res, info);
    });
  });
};

