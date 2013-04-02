define([
  'underscore',
  'jquery',
  './lib/view',
  'rdust!../../views/datasources',
  '../models/datasourcesCollection',
  './modal/deleteModal'
], function (_, $, View, template, datasources, DeleteModal) {
  'use strict';

  var constructor = View;

  var DatasourceList = constructor.extend({
    template: template,

    events: {
      'click [data-delete-id]': 'deleteDatasource'
    },


    initialize: function () {
      datasources.on('all', _.bind(this.render, this));
      datasources.fetch();
    },

    render: function () {
      var view = this;
      var data = { datasources: datasources.toJSON() };

      this.template.render(data, function (err, output) {
        var $el = $(view.el);
        $el.html(output);
        view.rendered = true;
      });

      return this;
    },

    deleteDatasource: function (e) {
      e.preventDefault();

      var model = datasources.get($(e.currentTarget).attr('data-delete-id'));

      if (!model) {
        return;
      }

      new DeleteModal({
        title: model.get('name')
      })
      .on('ok', function () {
        model.destroy();
      })
      .open();
    }
  });

  return DatasourceList;

});