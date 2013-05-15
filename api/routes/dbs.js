
var dbs = require('../lib/dbs');
var send = require('./utils').send;

var formatRows = function (rows) {
  rows.forEach(formatRow);
  return rows;
};
var formatRow = function (row) {
  row.pooling = row.pooling === '1';

  row.disable = row.disable === '1';
  row.enable_clob = row.enable_clob === '1';
  row.enable_blob = row.enable_blob === '1';

  row.disable_autogenkeys = row.disable_autogenkeys === '1';

  row.alter = row.alter === '1';
  row.grant = row.grant === '1';
  row.update = row.update === '1';
  row.delete = row.delete === '1';
  row.create = row.create === '1';
  row.storedproc = row.storedproc === '1';
  row.insert = row.insert === '1';
  row.drop = row.drop === '1';
  row.revoke = row.revoke === '1';
  row.select = row.select === '1';
};

module.exports = function(ns, app) {
  app.get(ns + 'datasources', function(req, res) {
    dbs.list(function(err, rows) {
      if(err) throw err;
      
      rows = formatRows(rows);
      send(res, rows);
    });
  });
  
  app.post(ns + 'datasources', function(req, res) {
    dbs.insert(req.body, function(err, info) {
      if(err) throw err;
      
      send(res, {
        'id': info.insertId
      });
    });
  });
  
  app.put(ns + 'datasources/:id', function(req, res) {
    dbs.update(req.body, function(err, info) {
      if(err) throw err;
      
      send(res, {
        'id': req.body.id
      });
    });
  });

  app.delete(ns + 'datasources/:id', function(req, res) {
    dbs.delete(req.params.id, function(err, info) {
      if(err) throw err;
      send(res, info);
    });
  });
};

