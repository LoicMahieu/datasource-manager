define([
  'underscore',
  'bootstrap',
  'backbone',
  './lib/view',
  'rdust!../../views/servers',
  '../models/serversCollection',
  './modal/deleteModal',
  './modal/dbsListModal'
], function (_, $, Backbone, View, template, servers, DeleteModal, DBSListModal) {
  'use strict';

  var constructor = View;

  var ServerList = constructor.extend({
    template: template,

    events: {
      'click [data-delete-id]': 'deleteServer',
      'click [data-listdbs-id]': 'listServerDBs'
    },

    initialize: function () {
      servers.on('all', _.bind(this.render, this));
      servers.fetch();
    },

    render: function () {
      var view = this;
      var data = { servers: servers.toJSON() };

      this.template.render(data, function (err, output) {
        var $el = $(view.el);
        $el.html(output);

        view.rendered = true;
      });

      return this;
    },

    deleteServer: function (e) {
      e.preventDefault();

      var server = servers.get($(e.currentTarget).attr('data-delete-id'));

      if (!server) {
        return;
      }

      var modal = new DeleteModal({
        title: server.get('reference')
      });

      modal.on('ok', function () {
        server.destroy();
      });

      modal.open();
    },

    listServerDBs: function (e) {
      e.preventDefault();

      var server = servers.get($(e.currentTarget).attr('data-listdbs-id'));

      if (!server) {
        return;
      }

      var modal = new DBSListModal(server);
      modal.open();
    }
  });

  return ServerList;

});