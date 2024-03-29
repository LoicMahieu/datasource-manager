
var servers = require('../lib/servers');
var util = require('./utils');
var send = util.send;
var formatRows = util.formatRows;

var formatTable = ['disabled'];

module.exports = function(ns, app) {
  app.get(ns + 'servers', function (req, res) {
    servers.list(function (err, rows) {
      if (err) throw err;

      rows = formatRows(rows, formatTable);
      send(res, rows);
    });
  });

  app.post(ns + 'servers', function (req, res) {
    servers.insert(req.body, function (err, info) {
      if (err) throw err;

      send(res, {
        'id': info.insertId
      });
    });
  });

  app.put(ns + 'servers/:id', function (req, res) {
      servers.update(req.body, function (err, info) {
        if (err) throw err;

        send(res, {
          'id': req.body.id,
          'datasourceIds': req.body.datasourceIds
        });
      });
  });

  app.delete(ns + 'servers/:id', function (req, res) {
    servers.delete(req.params.id, function (err, info) {
      if (err) throw err;

      send(res, info);
    });
  });
};

