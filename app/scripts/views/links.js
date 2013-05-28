define([
  'async',
  'underscore',
  'jquery',
  './lib/view',
  './ui/btn-switch',
  'rdust!../../views/links',
  'rdust!../../views/links_table',
  '../models/datasourcesCollection',
  '../models/serversCollection',
  '../lib/cfagent'
], function (async, _, $, View, BtnSwitch, template, templateTable, datasources, servers, CFAgent, undefined) {
  'use strict';

  var constructor = View, proto = View.prototype;

  var Links = constructor.extend({
    template: template,

    events: {
      'click .check-column': 'checkColumn',
      'click .check-row': 'checkRow',
      'click tbody td': 'checkInput',
      'click button[type="submit"]': 'save',
      'btn-switch.activate .btn-switch': '_toggleOn',
      'btn-switch.desactivate .btn-switch': '_toggleOff',
      'click #apply-rules': 'applyRules'
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
      var serverid = $(e.currentTarget).data('id');

      var $inputs = this.$el.find('input[data-serverid="' + serverid + '"]');

      if ($inputs.filter('[checked]').length === 0) {
        $inputs.attr('checked', 'true');
      } else {
        $inputs.removeAttr('checked');
      }
    },

    checkRow: function (e) {
      var datasourceid = $(e.currentTarget).data('id');

      var $inputs = this.$el.find('input[data-datasourceid="' + datasourceid + '"]');

      if ($inputs.filter('[checked]').length === 0) {
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

    _toggleOn: function () {
      this.$el.find('input:not(:checked)').attr('disabled', 'true');
      this.$el.find('#apply-rules').removeClass('disabled');
      this.$el.find('#save-links').addClass('disabled');
    },

    _toggleOff: function () {
      this._render();
      this.$el.find('#apply-rules').addClass('disabled');
      this.$el.find('#save-links').removeClass('disabled');

      this.$progressBarContainer.empty();
    },

    applyRules: function () {
      if (this.$applyRulesButton.hasClass('disabled') || !window.confirm('Are you sure?')) {
        return;
      }

      this.$progressBarContainer.empty();
      this.$applyRulesButton.addClass('disabled');

      var view = this,
          links = {},
          size = 0;

      var $tds = {};

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

      var superCallTasks = this._processLinks(links, $tds, this.$progressBarContainer);
      var enableApply = function () {
        view.$applyRulesButton.removeClass('disabled');
        $.each($tds, function () {
          this.children().removeAttr('disabled');
        });
      };

      this._removeTooltip();

      async.parallel(superCallTasks, enableApply);
    },

    _processLinks: function (links, $tds) {
      var superCallTasks = [];
      var view = this;

      $.each(links, function (i, servs) {
        var cfagent = CFAgent.createFromServer(servs.server),
            dbs = servs.datasources,
            ref = servs.server.get('reference'),
            fail = 0,
            success = 0,
            callTasks = [];

        var $title = $('<h3 />').text(ref),
            $progress = $('<div />', { class: 'progress progress-striped active'}),
            $failBar = $('<div />', { class: 'bar bar-danger', style: 'width: 0%' }),
            $progressBar = $('<div />', { class: 'bar', style: 'width: 0%' });

        $.each(dbs, function (j, db) {
          var doCall = function (next) {
            var call = cfagent.setDatasource(db);
            var key = db.get('id') + '-' + servs.server.get('id');

            var tooltip = function (text) {
              $tds[key].attr('data-toggle', 'tooltip')
                  .attr('title', text);
            };

            var callFail = function (status) {
              if (status) {
                tooltip(status);
              }
              fail++;
              $tds[key].addClass('error');
              $failBar.css('width', ((fail / dbs.length) * 100) + '%');
            };

            call.done(function (data) {
              tooltip(data.status);

              if (data.error) {
                console.warn(data.error);
              }

              if (!data.success) {
                callFail();
                return;
              }

              success++;
              $tds[key].addClass('success');
              $progressBar.css('width', ((success / dbs.length) * 100) + '%');
            });

            call.fail(function (xhr, error, status) {
              console.warn('HTTP Error: ' + xhr.status + ' ' + xhr.statusText, xhr, error, status);

              callFail(xhr.status + ' ' + xhr.statusText);
            });

            call.always(function () {
              if (success + fail === dbs.length) {
                $progress.removeClass('progress-striped active');
              }
              next();
            });

          };

          callTasks.push(doCall);
        });

        superCallTasks.push(function (done) {
          async.series(callTasks, done);
        });

        $progressBar.appendTo($progress);
        $failBar.appendTo($progress);
        $title.appendTo(view.$progressBarContainer);
        $progress.appendTo(view.$progressBarContainer);
      });

      return superCallTasks;
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
        this.$progressBarContainer = this.$el.find('#progressbars-container');
        this.$applyRulesButton = this.$el.find('#apply-rules');

        this.$btnSwitch = this.$el.find('.btn-switch');
        this.$btnSwitch.btnSwitch();
      }

      if (this.$btnSwitch.hasClassLeft()) {
        this.$btnSwitch.trigger('click');
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
            serverId: serv.get('id'),
            error: valid.length ? true : undefined
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