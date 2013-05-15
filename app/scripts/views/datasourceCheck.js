define([
  'underscore',
  'jquery',
  './lib/view',
  'rdust!../../views/datasource_check',
  'rdust!../../views/datasource_check_list',
  '../models/datasourcesCollection'
], function (_, $, View, template, listTemplate, datasources) {
  'use strict';

  var constructor = View;

  var DatasourceList = constructor.extend({
    template: template,

    events: {},

    initialize: function () {
      datasources.on('all', _.bind(this.doCheck, this));
      datasources.fetch();
    },

    render: function () {
      var view = this;
      var data = {};

      this.template.render(data, function (err, output) {
        var $el = $(view.el);
        $el.html(output);

        view.$check = $el.find('.datasourceCheck_container');

        view.rendered = true;

        view.doCheck();
      });

      return this;
    },

    doCheck: function () {
      var view = this;

      if (!view.rendered) {
        return;
      }

      var nonValids = [];
      datasources.map(function (db) {
        var valid = db.valid();
        if (valid.length) {
          nonValids.push($.extend({
            messages: valid
          }, db.toJSON()));
        }
      });

      var data = { nonValids: nonValids };
      listTemplate.render(data, function (err, output) {
        view.$check.html(output);
      });
    }
  });

  return DatasourceList;

});