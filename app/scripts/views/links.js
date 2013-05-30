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
      'click #apply-rules': 'applyRules',
      'click .check-all': 'checkAll'
    },

    initialize: function () {
      datasources.on('reset add remove', _.bind(this._render, this));
      datasources.fetch();

      servers.on('reset add remove', _.bind(this._render, this));
      servers.fetch();

    },

    save: function () {
      if (this.$btnSwitch.hasClassLeft()) {
        return;
      }

      var saves = [];

      this.$el.find('input[type=checkbox]:not(:disabled)').each(function () {
        console.log(this);
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

    checkAll: function (e) {
      if (!this.$btnSwitch.hasClassLeft() || $(e.currentTarget).attr('disabled')) {
        return;
      }

      var $inputs = this.$el.find('#links_table').find(':checkbox:not(:disabled)');
      if ($inputs.filter(':checked').length === 0) {
        $inputs.prop('checked', true);
      } else {
        $inputs.prop('checked', false);
      }
    },

    checkColumn: function (e) {
      var serverid = $(e.currentTarget).data('id');

      var $inputs = this.$el.find('input[data-serverid="' + serverid + '"]:not(:disabled)');

      console.log($inputs.length);

      if ($inputs.filter(':checked').length === 0) {
        $inputs.prop('checked', true);
      } else {
        console.log('ici');
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
      if ($(e.srcElement).is('input')) {
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

    _toggleOn: function () {
      var view = this;
      this.$el.find('input:not(:checked)').attr('disabled', 'true');
      this.$el.find('.check-all').removeAttr('disabled');

      var servs = servers.where({disabled: true});

      $.each(servs, function (i, serv) {
        view.$el.find('input[data-serverid="' + serv.get('id') + '"]')
                .attr('disabled', 'true')
                .removeAttr('checked');
      });

      this.$el.find('#apply-rules').removeClass('disabled');
      this.$el.find('#save-links').addClass('disabled');
      this.$el.find('.to-hide').show();
      this.$checkForce.removeAttr('disabled');
    },

    _toggleOff: function () {
      this._render();
      this.$el.find('#apply-rules').addClass('disabled');
      this.$el.find('#save-links').removeClass('disabled');
      this.$el.find('.check-all').attr('disabled', 'true');

      this.$progressBarContainer.empty();
    },

    applyRules: function () {
      if (this.$applyRulesButton.hasClass('disabled') || !window.confirm('Are you sure?')) {
        return;
      }

      this.$progressBarContainer.empty();
      this.$applyRulesButton.addClass('disabled');
      this.$checkForce.attr('disabled', 'true');

      var view = this,
          links = {},
          size = 0;

      var $tds = {};

      this.$el.find('#links_table input:checked').each(function () {
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

      var superCallTasks = this._processLinks(links, $tds);
      var enableApply = function () {
        view.$applyRulesButton.removeClass('disabled');
        view.$checkForce.removeAttr('disabled');

        $.each($tds, function () {
          this.children().removeAttr('disabled');
        });

        view.applyToolTip();
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
            var force = view.$checkForce.parents('label').find(':input:checked').length ? true : false;
            var call = cfagent.setDatasource(db, force);
            var key = db.get('id') + '-' + servs.server.get('id');

            var tooltip = function (text) {
              $tds[key].attr('data-toggle', 'tooltip')
                  .attr('data-original-title', text);
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
              .removeClass()
              .removeAttr('data-toggle')
              .removeAttr('data-original-title');
    },

    render: function () {
      var rendered = this.rendered;


      proto.render.apply(this, arguments);

      this.applyToolTip();


      if (!rendered) {
        this.$progressBarContainer = this.$el.find('#progressbars-container');
        this.$applyRulesButton = this.$el.find('#apply-rules');
        this.$checkForce = this.$el.find('#check-force');

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
          }).join('<br>');

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
        view.applyToolTip();
      });

      this.$el.find('.to-hide').hide();
      this.$checkForce.attr('disabled', 'true');

    }
  });

  return Links;

});