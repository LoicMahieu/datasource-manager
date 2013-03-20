
var dbs = require('../lib/dbs');
var send = require('./utils').send;

module.exports = function(ns, app) {
  app.get(ns + 'datasources', function(req, res) {
    dbs.list(function(err, rows) {
      if(err) throw err;
      
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

