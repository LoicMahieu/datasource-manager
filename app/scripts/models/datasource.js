define([
  'backbone',
  '../namespace'
], function (Backbone, ns) {
  'use strict';

  var constructor = Backbone.Model;

  var Model = constructor.extend({
    urlRoot: ns.apiPath + '/datasources',
    defaults: {
      port: 3306,
      pooling: true,
      timeout: 20,
      interval: 7,
      login_timeout: 30,
      buffer: 64000,
      blob_buffer: 64000,
      select: true,
      create: true,
      grant: true,
      insert: true,
      drop: true,
      revoke: true,
      update: true,
      alter: true,
      storedproc: true,
      delete: true,
      disable: false,
      enablemaxconnections: false,
      maxconnections: false,
      version: 1,
      validationQuery: 'SELECT 1 = 1'
    },

    initialize: function () {
      var model = this;
      this.on('change', function () {
        if (!model.hasChanged('version')) {
          model.set('version', model.get('version') + 1);
        }
      });
    },

    valid: function () {
      var notValids = [];

      for (var key in this.validations) {

        if (!this.validations.hasOwnProperty(key)) {
          continue;
        }

        var validations = this.validations[key];
        for (var i = 0 ; i < validations.length ; i++) {

          if (!validations[i][2](this)) {
            notValids.push({
              level: validations[i][0],
              message: validations[i][1]
            });
          }

        }
      }

      return notValids;
    },

    validations : {
      database: [
        ['error',
         'The database name is empty',
         function (db) {
          return db.get('database').trim() !== '';
        }]
      ],

      username: [
        ['error',
         'The username is empty',
         function (db) {
          return db.get('username').trim() !== '';
        }]
      ],

      password: [
        ['error',
         'The password is empty',
         function (db) {
          return db.get('password').trim() !== '';
        }]
      ],

      host: [
        ['error',
         'The host is empty',
         function (db) {
          return db.get('host').trim() !== '';
        }]
      ],

      validationQuery: [
        ['error',
         'The validationQuery is empty',
         function (db) {
          return db.get('validationQuery').trim() !== '';
        }]
      ],

      name: [
        ['error',
         'The name is empty',
         function (db) {
          return db.get('name').trim() !== '';
        }]
      ],

      disable: [
        ['error',
         'The disable connection field is checked',
         function (db) {
          return !db.get('disable');
        }]
      ],

      maxconnections: [
        ['error',
         'maxconnections is not setted but enablemaxconnections is true',
         function (db) {
          return !(db.get('enablemaxconnections') && !db.get('maxconnections'));
        }]
      ],

      port: [
        ['warning',
         'The port isn\'t 3306',
         function (db) {
          return db.get('port').trim() === '3306';
        }]
      ]


    }
  });

  return Model;

});