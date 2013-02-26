define([
  'backbone',
  'backbone.localStorage',
  './datasourcesCollection'
], function(Backbone, BackboneLocalStorage, datasources) {

  var constructor = Backbone.Model;

  var Model = constructor.extend({
    localStorage: new BackboneLocalStorage('servers'),
    defaults: {
      datasourceIds: []
    },

    getDatasources: function() {
      var dbs = new datasources.constructor;

      _.each(this.attributes.datasourceIds, function(id) {
        var db = datasources.get(id);
        if( db ) {
          dbs.add(datasources.get(id));
        }
      });

      return dbs;
    },

    hasDatasource: function(datasource) {
      var datasourceId = datasource.get ? datasource.get('id') : datasource;
      return _.contains(this.attributes.datasourceIds, datasourceId);
    },

    addDatasource: function(datasource) {
      var datasourceId = datasource.get ? datasource.get('id') : datasource;
      this.attributes.datasourceIds.push(datasourceId);
      return this;
    },

    removeDatasource: function(datasource) {
      var datasourceId = datasource.get ? datasource.get('id') : datasource;
      this.attributes.datasourceIds = _.without(this.attributes.datasourceIds, datasourceId);
      return this;
    }
  });

  return Model;

});