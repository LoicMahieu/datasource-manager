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
      'click .verify': 'verify',
      'click .check-all': 'checkAll'
    },

    initialize: function () {

      datasources.on('reset add remove', _.bind(this._render, this));
      datasources.fetch();

      servers.on('reset add remove', _.bind(this._render, this));
      servers.fetch();
    },

    checkAll: function () {
      var $inputs = this.$el.find(':checkbox:not(:disabled)');

      if ($inputs.filter(':checked').length === 0) {
        $inputs.prop('checked', true);
      } else {
        $inputs.prop('checked', false);
      }
    },

    checkColumn: function (e) {
      var serverid = $(e.currentTarget).data('id');

      var $inputs = this.$el.find('input[data-serverid="' + serverid + '"]:not(:disabled)');

      if ($inputs.filter(':checked').length === 0) {
        $inputs.prop('checked', true);
      } else {
        $inputs.prop('checked', false);
      }
    },

    checkRow: function (e) {
      var datasourceid = $(e.currentTarget).data('id');

      var $inputs = this.$el.find('input[data-datasourceid="' + datasourceid + '"]:not(:disabled)');

      if ($inputs.filter(':checked').length === 0) {
        $inputs.prop('checked', true);
      } else {
        $inputs.prop('checked', false);
      }
    },

    checkInput: function (e) {
      if ($(e.target).is('input')) {
        return;
      }
      var $input = $(e.currentTarget).find('input');
      if ($input.attr('disabled') !== undefined && $input.attr('disabled') === 'disabled') {
        return;
      }
      if (!$input.is(':checked')) {
        $input.prop('checked', true);
      } else {
        $input.prop('checked', false);
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
          view.applyToolTip();
        }
      );
    },

    _verify: function (links, $tds) {
      var view = this;
      var superCallTasks = [];

      $.each(links, function (i, servs) {

        var cfagent = CFAgent.createFromServer(servs.server);
        var dbs = servs.datasources,
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
          async.series(callTasks, done);
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
         .attr('data-original-title', text)
         .addClass(type);
    },

    _removeTooltip: function () {
      this.$el.find('td')
              .removeClass()
              .removeAttr('data-toggle')
              .removeAttr('data-original-title');
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
          }).join('<br>');

          data.error = error;
        }

        data.checked = [];
        servers.each(function (serv) {
          data.checked.push({
            check: serv.hasDatasource(db),
            serverId: serv.get('id'),
            error: (serv.get('disabled')) ? true : undefined
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
        view.applyToolTip();
      });

    }

  });

  return VerifyLinks;

});