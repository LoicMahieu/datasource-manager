define([
  'underscore',
  'jquery',
  './lib/view',
  'rdust!../../views/links',
  '../models/datasourcesCollection',
  '../models/serversCollection'
], function (_, $, View, template, datasources, servers) {
  'use strict';

  var constructor = View, proto = View.prototype;

  var Links = constructor.extend({
    template: template,

    events: {
      'click thead td': 'checkColumn',
      'click tbody th': 'checkRow',
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
            server = $input.data('server'),
            db = $input.data('datasource');

        server[checked ? 'addDatasource' : 'removeDatasource'](db);

        saves.push(server);
      });

      _.uniq(saves).forEach(function (server) {
        server.save();
      });
    },

    checkColumn: function (e) {
      var index = $(e.currentTarget).index(),
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
        $inputs.attr('checked', 'checked');
      } else {
        $inputs.removeAttr('checked');
      }
    },

    checkRow: function (e) {
      var $inputs = $(e.currentTarget).parent('tr').find('input'),
          checked = $inputs.filter('[checked]').size(),
          nonChecked = $inputs.filter(':not([checked])').size();

      if (checked === 0 || checked > nonChecked && checked !== $inputs.size()) {
        $inputs.attr('checked', 'checked');
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
        $input.attr('checked', 'checked');
      } else {
        $input.removeAttr('checked');
      }
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

      var $head = this.$el.find('thead tr');
      var $body = this.$el.find('tbody');

      $head.find('td:not(:first)').remove();
      $body.find('tr').remove();

      servers.each(function (server) {
        $('<td />')
          .append(
            $('<a />')
              .attr('href', '#/servers/' + server.get('id'))
              .text(server.get('reference'))
          )
          .appendTo($head);
      });

      datasources.each(function (db) {
        var $tr = $('<tr />')
          .append(
            $('<th />')
              .append(
                $('<a />')
                  .attr('href', '#/datasources/' + db.get('id'))
                  .text(db.get('name'))
              )
          )
          .appendTo($body);

        servers.each(function (server) {
          var $input = $('<input />', {
            type: 'checkbox',
            checked: server.hasDatasource(db)
          })
            .data('server', server)
            .data('datasource', db);
          $('<td />')
            .append($input)
            .appendTo($tr);
        });
      });
    }
  });

  return Links;

});