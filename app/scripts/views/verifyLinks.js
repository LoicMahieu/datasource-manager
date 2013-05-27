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
  '../lib/verifyLinks'
], function (async, _, $, View, template, templateTable, datasources, servers, CFAgent, VerifyLib, undefined) {
  'use strict';

  var constructor = View, proto = View.prototype;

  var VerifyLinks = constructor.extend({
    template: template,

    events: {
      'click .check-column': 'checkColumn',
      'click .check-row': 'checkRow',
      'click tbody td': 'checkInput',
      'click button[type="button"]': 'verify'
    },

    initialize: function () {

      datasources.on('reset add remove', _.bind(this._render, this));
      datasources.fetch();

      servers.on('reset add remove', _.bind(this._render, this));
      servers.fetch();
    },

    checkColumn: function (e) {
      var index = $(e.currentTarget).data('id'),
          $inputs = $();

      this.$el.find('tbody tr').each(function () {
        $(this)
          .find('td:eq(' + (index <= 0 ? 0 : index - 1) + ')')
          .find('input:not(:disabled)')
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
      var $inputs = $rowInput.find('input:not(:disabled)'),
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
      if ($input.attr('disabled') !== undefined && $input.attr('disabled') === 'disabled') {
        return;
      }
      if (!$input.is(':checked')) {
        $input.attr('checked', 'true');
      } else {
        $input.removeAttr('checked');
      }
    },

    verify: function () {
      if (this.$verifyButton.hasClass('disabled')) {
        return;
      }
      var view = this;

      this.$verifyButton.addClass('disabled');

      var links = {};
      var $tds = {};
      var size = 0;

      this.$el.find('input:checked').each(function () {
        var servId = $(this).data('serverid'),
            dsId = $(this).data('datasourceid'),
            serv = servers.get(servId),
            ds = datasources.get(dsId);

        if (!links[servId]) {
          links[servId] = {
            server: serv,
            datasources : []
          };
          size++;
        }

        links[servId].datasources.push(ds);
        $tds[dsId + '-' + servId] = $(this).parent();
        $(this).attr('disabled', 'disabled');
      });

      this._removeTooltip();

      var superCallTasks = this._verify(links, $tds);

      async.parallel(
        superCallTasks,
        function () {
          view.$verifyButton.removeClass('disabled');
          $.each($tds, function () {
            this.children().removeAttr('disabled');
          });
        }
      );

    },

    _verify: function (links, $tds) {
      var view = this;
      var superCallTasks = [];

      $.each(links, function (i, servs) {
        var cfagent = CFAgent.createFromServer(servs.server),
            dbs = servs.datasources,
            callTasks = [];

        $.each(dbs, function (j, db) {
          var key = db.get('id') + '-' + servs.server.get('id');

          callTasks.push(function (next) {
            view._processDB(cfagent, db, function (res) {
              if (!res.length) {
                view._tooltip($tds[key], 'success', 'success');
              } else {
                view._tooltip($tds[key], res, 'error');
              }

              next();
            });
          });
        });

        superCallTasks.push(function (done) {
          async.parallel(callTasks, done);
        });
      });

      return superCallTasks;
    },

    _processDB: function (cfagent, db, cb) {
      VerifyLib.verify(cfagent, db, cb);
    },

    _tooltip: function ($el, text, type) {
      if (!text) {
        text = 'error unknown';
      }

      if (text instanceof Array) {
        text = text.join('\n');
      }

      $el.attr('data-toggle', 'tooltip')
         .attr('title', text)
         .addClass(type);
    },

    _removeTooltip: function () {
      this.$el.find('td')
              .removeClass('success error')
              .removeAttr('data-toggle')
              .removeAttr('title');
    },

    render: function () {
      var rendered = this.rendered;
      proto.render.apply(this, arguments);

      if (!rendered) {
        this.$verifyButton = this.$el.find('button[type="button"]');
      }

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