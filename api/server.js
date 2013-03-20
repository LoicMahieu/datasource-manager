var express = require('express');
var dbs = require('./lib/dbs');

var send = function (res, data) {
  res.end(JSON.stringify(data));
};

var init = function (connect, ns) {
  var app = express();

  ns = ns || '/api/v1/';

  //body parser already loaded in routes
  return app.router;
};

module.exports = init;