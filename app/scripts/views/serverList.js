define([
  'underscore',
  'bootstrap',
  'backbone',
  './lib/view',
  'rdust!../../views/servers',
  '../models/serversCollection',
  './modal/deleteModal',
  './modal/dbsListModal',
  './modal/disableServerModal'
], function (_, $, Backbone, View, template, servers, DeleteModal, DBSListModal, DisableModal) {
  'use strict';

  var constructor = View;

  var ServerList = constructor.extend({
    template: template,

    events: {
      'click [data-delete-id]': 'deleteServer',
      'click [data-listdbs-id]': 'listServerDBs',
      'click [data-disable-id]': 'disableEnableServer'
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

    disableEnableServer: function (e) {
      var server = servers.get($(e.currentTarget).attr('data-disable-id'));
      if (!server) {
        return;
      }

      var modal = new DisableModal({
        okText: server.get('disabled') ? 'Enable' : 'Disable',
        title: server.get('reference')
      });

      modal.on('ok', function () {
        server.set('disabled', !server.get('disabled'));
        server.save();
      });

      modal.open();

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