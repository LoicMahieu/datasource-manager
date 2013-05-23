define([
  'async',
  'underscore',
  'jquery',
  './lib/view',
  'rdust!../../views/links',
  'rdust!../../views/links_table',
  '../models/datasourcesCollection',
  '../models/serversCollection',
  '../lib/cfagent',
], function (async, _, $, View, template, templateTable, datasources, servers, CFAgent, undefined) {
  'use strict';

  var constructor = View, proto = View.prototype;

  var Links = constructor.extend({
    template: template,

    events: {
      'click .check-column': 'checkColumn',
      'click .check-row': 'checkRow',
      'click tbody td': 'checkInput',
      'click button[type="submit"]': 'save',
      'click button[type="button"]': 'toggle',
      'click #apply-rules': 'applyRules'
    },

    initialize: function () {
      var view = this;
      datasources.on('reset add remove', _.bind(this._render, this));
      datasources.fetch();

      servers.on('reset add remove', _.bind(this._render, this));
      servers.fetch();

      this.on('hide', function () {
        view.$el.find('#btn-off').trigger('click');
      });
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

    toggle: function (e) {
      var $input = $(e.currentTarget);
      var left = 'btn-switch-left',
          right = 'btn-switch-right';

      if (!$input.prev().length && $input.parent().hasClass(left)) {
        this._toggle($input, left, right, false);
        return;
      }

      if (!$input.next().length && $input.parent().hasClass(right)) {
        this._toggle($input, right, left, true);
        return;
      }

      if ($input.prev().length && !$input.parent().hasClass(right)) {
        this._toggle($input, left, right, false);
        return;
      }

      if ($input.next().length && !$input.parent().hasClass(left)) {
        this._toggle($input, right, left, true);
        return;
      }
    },

    _toggle: function ($input, classToRemove, classToAdd, enable) {
      $input.parent().removeClass(classToRemove).addClass(classToAdd);
      this[enable ? '_toggleOn' : '_toggleOff']();
    },

    _toggleOn: function () {
      this.$el.find('input:not(:checked)').attr('disabled', 'true');
      this.$el.find('#apply-rules').removeClass('disabled');
      this.$el.find('#save-links').addClass('disabled');
    },

    _toggleOff: function () {
      this.render();
      this.$el.find('#apply-rules').addClass('disabled');
      this.$el.find('#save-links').removeClass('disabled');

      $('.' + this.progressFinder).remove();
    },

    applyRules: function (e) {
      var $apply = $(e.currentTarget);
      this.progressFinder = 'progress-finder';

      if ($apply.hasClass('disabled')) {
        return;
      }

      if (!window.confirm('Are you sure?')) {
        return;
      }

      $('.' + this.progressFinder).remove();
      $apply.addClass('disabled');

      var links = {},
          size = 0;

      var $tds = {},
          $progressBarContainer = $('#progressbars-container');

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

      var superCallTasks = this._processLinks(links, $tds, $progressBarContainer);
      var enableApply = function () {
        $apply.removeClass('disabled');
        $.each($tds, function () {
          this.children().removeAttr('disabled');
        });
      };

      async.parallel(superCallTasks, enableApply);

    },

    _processLinks: function (links, $tds, $progressBarContainer) {
      var superCallTasks = [];
      var view = this;

      $.each(links, function (i, servs) {
        var cfagent = CFAgent.createFromServer(servs.server),
            dbs = servs.datasources,
            ref = servs.server.get('reference'),
            fail = 0,
            success = 0,
            callTasks = [];

        var $title = $('<h3 />', {class: view.progressFinder}).text(ref),
            $progress = $('<div />', { class: 'progress progress-striped active ' + view.progressFinder }),
            $failBar = $('<div />', { class: 'bar bar-danger ' + view.progressFinder, style: 'width: 0%' }),
            $progressBar = $('<div />', { class: 'bar ' + view.progressFinder, style: 'width: 0%' });

        $.each(dbs, function (j, db) {
          var doCall = function (next) {
            var call = cfagent.setDatasource(db);
            var key = db.get('id') + '-' + servs.server.get('id');

            var callFail = function (data, error, status) {
              if (status) {
                $tds[key].attr('data-toggle', 'tooltip')
                    .attr('title', status);
              }
              fail++;
              $tds[key].addClass('error');
              $failBar.css('width', ((fail / dbs.length) * 100) + '%');
            };

            call.done(function (data) {
              $tds[key].attr('data-toggle', 'tooltip')
                  .attr('title', data.status);

              if (!data.success) {
                callFail();
                return;
              }

              success++;
              $tds[key].addClass('success');
              $progressBar.css('width', ((success / dbs.length) * 100) + '%');
            });

            call.fail(callFail);

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
        $title.appendTo($progressBarContainer);
        $progress.appendTo($progressBarContainer);
      });

      return superCallTasks;
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