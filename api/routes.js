
var express = require('express');

var init = function (connect, ns) {
  var app = express();

  ns = ns || '/api/v1/';

  require('./routes/dbs')(ns, app);
  require('./routes/servers')(ns, app);

  return [
    express.bodyParser(),
    app.router
  ];
};

module.exports = init;