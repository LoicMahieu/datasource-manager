define([
  'underscore',
  'bootstrap',
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
          }).join('<br>');

          data.error = error;
        }
        
        dataJson.push(data);
      });

      var data = { datasources: dataJson };

      this.template.render(data, function (err, output) {
        var $el = $(view.el);

        $el.html(output);
        view.applyToolTip();
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