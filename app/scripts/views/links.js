define([
  'underscore',
  'jquery',
  './lib/view',
  'rdust!../../views/links',
  'rdust!../../views/links_table',
  '../models/datasourcesCollection',
  '../models/serversCollection'
], function (_, $, View, template, templateTable, datasources, servers) {
  'use strict';

  var constructor = View, proto = View.prototype;

  var Links = constructor.extend({
    template: template,

    events: {
      'click .check-column': 'checkColumn',
      'click .check-row': 'checkRow',
      'click .cross-check-column': 'crossCheckColumn',
      'click .cross-check-row': 'crossCheckRow',
      'click tbody td': 'checkInput',
      'click button[type="submit"]': 'save'
    },

    initialize: function () {
      datasources.on('reset add remove', _.bind(this._render, this));
      datasources.fetch();

      servers.on('reset add remove', _.bind(this._render, this));
      servers.fetch();
    },

    save: function () {
      var saves = [];

      this.$el.find('input[type=checkbox]').each(function () {
        var $input = $(this),
            checked = $input.is(':checked'),
            server = servers.get($input.data('serverid')),
            db = datasources.get($input.data('datasourceid'));

        server[checked ? 'addDatasource' : 'removeDatasource'](db);

        saves.push(server);
      });

      _.uniq(saves).forEach(function (server) {
        server.save();
      });
    },

    checkColumn: function (e) {
      var index = $(e.currentTarget).data('id'),
          $inputs = $();

      this.$el.find('tbody tr').each(function () {
        $(this)
          .find('td:eq(' + (index <= 0 ? 0 : index - 1) + ')')
          .find('input')
          .each(function () {
            $inputs = $inputs.add(this);
          });
      });

      var checked = $inputs.filter('[checked]').size(),
          nonChecked = $inputs.filter(':not([checked])').size();

      if (checked === 0 || checked > nonChecked && checked !== $inputs.size()) {
        $inputs.attr('checked', 'true');
      } else {
        $inputs.removeAttr('checked');
      }
    },

    checkRow: function (e) {
      var $rowInput = $(e.currentTarget).parents('tr');
      var $inputs = $rowInput.find('input'),
          checked = $inputs.filter('[checked]').size(),
          nonChecked = $inputs.filter(':not([checked])').size();

      if (checked === 0 || checked > nonChecked && checked !== $inputs.size()) {
        $inputs.attr('checked', 'true');
      } else {
        $inputs.removeAttr('checked');
      }
    },

    checkInput: function (e) {
      if ($(e.srcElement).is('input')) {
        return;
      }
      var $input = $(e.currentTarget).find('input');
      if (!$input.is(':checked')) {
        $input.attr('checked', 'true');
      } else {
        $input.removeAttr('checked');
      }
    },

    crossCheckColumn: function (e) {
      console.log(e);
    },

    crossCheckRow: function (e) {
      console.log(e);
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
          error.level = valid[0].level;

          if (error.level === 'error') {
            error.level = 'danger';
          }

          error.message = valid.map(function (err) {
            return err.message;
          }).join('\n');

          data.error = error;
        }

        data.checked = [];
        servers.each(function (serv) {
          data.checked.push({
            check : serv.hasDatasource(db),
            serverId : serv.get('id')
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

  return Links;

});