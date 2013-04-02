
var c = require('./db-connect');

var links = {
  'deleteByServer': function (serverId, cb) {
    c.query("DELETE FROM link_server_datasource WHERE server_id = " + c.escape(serverId), cb);    
  },
  'deleteByDB': function (datasourceId, cb) {
    c.query("DELETE FROM link_server_datasource WHERE datasource_id = " + c.escape(datasourceId), cb);
  }
};

module.exports = links;