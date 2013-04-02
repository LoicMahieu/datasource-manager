define([
  'backbone',
  'underscore',
  './datasourcesCollection',
  '../namespace'
], function (Backbone, _, datasources, ns) {
  'use strict';

  var constructor = Backbone.Model;

  var Model = constructor.extend({
    
    urlRoot: ns.apiPath + '/servers',

    defaults: {
      datasourceIds: []
    },

    initialize: function () {
      constructor.prototype.initialize.apply(this, arguments);
      
      var self = this;

      datasources.on('destroy', function (model) {
        if (model.id) {
          self.removeDatasource(model.id);
        }
      });
    },

    getDatasources: function () {
      var dbs = new datasources.constructor();

      _.each(this.attributes.datasourceIds, function (id) {
        var db = datasources.get(id);
        if (db) {
          dbs.add(datasources.get(id));
        }
      });

      return dbs;
    },

    hasDatasource: function (datasource) {
      var datasourceId = datasource.get ? datasource.get('id') : datasource;
      return _.contains(this.attributes.datasourceIds, datasourceId);
    },

    addDatasource: function (datasource) {
      var datasourceId = datasource.get ? datasource.get('id') : datasource;
      if (!this.hasDatasource(datasourceId)) {
        this.attributes.datasourceIds.push(datasourceId);
      }
      return this;
    },

    removeDatasource: function (datasource) {
      var datasourceId = datasource.get ? datasource.get('id') : datasource;
      this.attributes.datasourceIds = _.without(this.attributes.datasourceIds, datasourceId);
      return this;
    }
  });

  return Model;

});