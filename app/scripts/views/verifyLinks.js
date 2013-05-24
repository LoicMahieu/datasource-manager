define([
  'async',
  'underscore',
  'jquery',
  './lib/view',
  'rdust!../../views/verify_links',
  'rdust!../../views/verify_links_table',
  '../models/datasourcesCollection',
  '../models/serversCollection',
  '../lib/cfagent',
], function (async, _, $, View, template, templateTable, datasources, servers, CFAgent, undefined) {
  'use strict';

  var constructor = View, proto = View.prototype;

  var VerifyLinks = constructor.extend({
    template : template,

    events : {

    },

    initialize: function () {
      var view = this;

      datasources.on('reset add remove', _.bind(this._render, this));
      datasources.fetch();

      servers.on('reset add remove', _.bind(this._render, this));
      servers.fetch();
    },

    render: function () {
      proto.render.apply(this, arguments);

      this._render();

      return this;
    },

    _render: function () {
      if (!this.rendered) {
        return;
      }
      var view = this;
      var dataJson = [];

      datasources.each(function (db) {
        var valid = db.valid();
        var error = {
          level: '',
          message: ''
        };
        var data = db.toJSON();

        if (valid.length) {
          error.level = valid[0].level === 'error' ? 'danger' : valid[0].level;

          error.message = valid.map(function (err) {
            return err.message;
          }).join('\n');

          data.error = error;
        }

        data.checked = [];
        servers.each(function (serv) {
          data.checked.push({
            check: serv.hasDatasource(db),
            serverId: serv.get('id')
          });
        });

        dataJson.push(data);
      });

      var data = {
        datasources: dataJson,
        servers: servers.toJSON()
      };

      templateTable.render(data, function (err, output) {
        view.$el.find('#links_table').html(output);
      });

    }

  });

  return VerifyLinks;

});