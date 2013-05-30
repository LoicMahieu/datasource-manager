define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.bootstrapModal',
  'rdust!../../../views/servers_dbs',
  '../../lib/cfagent',
  '../../models/datasourcesCollection'
], function ($, _, Backbone, BackboneBootstrapModal, dbsTemplate, CFAgent, datasources) {
  'use strict';

  var parent = Backbone.BootstrapModal, parentProto = parent.prototype;
  
  var Modal = parent.extend({
    events: {
      'click [data-addlocal]': 'addLocal',
      'click [data-delete]': 'delete',
      'click [data-valid]': 'valid',
      'click .validAll': 'validAll',
      'click .btn.ok': 'clickOK'
    },

    initialize: function (server) {
      this.server = server;
      this.cfagent = CFAgent.createFromServer(server);

      this.model = new Backbone.Model();
      this.model.on('change', this.renderDBs, this);

      parentProto.initialize.call(this, {
        title: server.get('reference'),
        content: 'Loading...',
        animate: true,
        allowCancel: false
      });

      this.fetch();
    },

    fetch: function () {
      var modal = this,
          model = this.model;
      this.cfagent.getDatasources(function (dbs) {
        model.set({
          by_name: dbs,
          dbs: $.map(dbs, function (db) {
            return db;
          })
        });
      }, function () {
        modal.$el.find('.modal-body').html('Loading error!');
      });
    },

    renderDBs: function () {
      var modal = this;

      var data = this.model.toJSON();

      data.notFound = [];
      datasources.each(function (db) {
        if (!_.where(data.dbs, { name: db.get('name') }).length) {
          data.notFound.push(db.get('name'));
        }
      });

      data.dbs = _.sortBy(data.dbs, function (db) {
        return db.name;
      });

      dbsTemplate.render(data, function (err, output) {
        modal.$el.find('.modal-body').html(output);
        modal._checkLocal();
      });
    },

    addLocal: function (e) {
      e.preventDefault();

      var name = $(e.currentTarget).attr('data-addlocal');
      var dbs = this.model.get('by_name');
      var db = dbs[name];

      var datasource = new datasources.model({
        name: db.name,
        database: db.urlmap.database,
        host: db.urlmap.host,
        port: '' + parseInt(db.urlmap.port, 10),
        username: db.username,
        password: db.password,

        description: db.description,

        args: db.urlmap.args,
        maxconnections: db.urlmap.maxconnections ? parseInt(db.urlmap.maxconnections, 10) : 0,

        login_timeout: parseInt(db.login_timeout, 10),
        interval: parseInt(db.interval, 10),
        buffer: parseInt(db.buffer, 10),
        blob_buffer: parseInt(db.blob_buffer, 10),
        enable_clob: !db.disable_clob,
        enable_blob: !db.disable_blob,

        pooling: db.pooling,

        alter: db.alter,
        grant: db.grant,
        update: db.update,
        delete: db.delete,
        create: db.create,
        storedproc: db.storedproc,
        insert: db.insert,
        drop: db.drop,
        revoke: db.revoke,
        select: db.select,

        disable: db.disable,
        timeout: parseInt(db.timeout, 10),

        disable_autogenkeys: db.disable_autogenkeys,
        validationQuery: db.validationquery
      });
      datasources.add(datasource).sort();
      datasource.save();
      
      this._checkLocal();
    },

    delete: function (e) {
      e.preventDefault();

      var $button = $(e.currentTarget),
          name = $button.attr('data-delete');

      if (!window.confirm('Are you sure that you want to delete this datasource ?')) {
        return;
      }

      this.cfagent.deleteDatasource(name, function (res) {
        if (res) {
          $button.parents('tr').remove();
        } else {
          window.alert('Unknown error');
        }
      });
    },

    valid: function (e) {
      e.preventDefault();

      var $button = $(e.currentTarget),
          name = $button.attr('data-valid'),
          successClass = 'btn-success',
          errorClass = 'btn-danger',
          normalClass = 'btn-info';

      if ($button.is(':disabled')) {
        return;
      }

      $button
        .removeClass(successClass)
        .removeClass(errorClass)
        .addClass(normalClass)
        .attr('disabled', 'disabled');

      this.cfagent.verifyDsn(name, function (res) {
        if (res) {
          $button
            .removeClass(normalClass)
            .removeAttr('disabled')
            .addClass(successClass);
        } else {
          $button
            .removeClass(normalClass)
            .removeAttr('disabled')
            .addClass(errorClass);
        }
      });
    },

    validAll: function (e) {
      e.preventDefault();
      this.$el.find('[data-valid]').trigger('click');
    },

    clickOK: function (e) {
      e.preventDefault();
      this.close();
    },

    _checkLocal: function () {
      var dbs = this.model.get('by_name');

      this.$el.find('[data-addlocal]').each(function () {
        var $button = $(this),
            name = $button.attr('data-addlocal'),
            db = dbs[name],
            exists = datasources.where({ name: db.name }).length;

        $button.prop('disabled', exists);
      });
    }
  });

  return Modal;

});