'use strict';

module.exports = function(grunt) {

  // Nodejs libs.
  var dbs = require('./lib/dbs');

  // External libs.
  var express = require('express');

  grunt.registerTask('api_server', 'Start API web server.', function() {

  // Merge task-specific options with these defaults.
  var options = this.options({
    port: 9000,
    hostname: 'localhost',
    ns: '/api/v1/'
  });

  var app = express();

  app.configure(function() {
    app.use(express.bodyParser());
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      next();
    });
  });

  console.log(options.port);

  app.listen(options.port, function() {
    // Start server.
    grunt.log.writeln('Starting API web server on ' + options.hostname + ':' + options.port + '.');
  });

  app.get(options.ns + 'datasources', function(req, res) {
    dbs.list(function(err, rows) {
      res.send(rows);
    });
  });

  
  app.post(options.ns + 'datasources', function(req, res) {
    dbs.insert(req.body, function(err, info) {
      res.send({
        'id': info.insertId
      });
    });
  });
  
  app.put(options.ns + 'datasources', function(req, res) {
    dbs.update(req.body, function(err, info) {
      console.log(err);
      console.log(info);
      res.send({
        'id': info.insertId
      });
    });
  });

  app.delete(options.ns + 'datasources', function(req, res) {
    dbs.delete(req.body, function(err, rows) {
      console.log(err);
      console.log(rows);
      res.send(rows);
    });
  });

  this.async();

  });

};
