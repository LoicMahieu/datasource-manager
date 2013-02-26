define([
  'backbone',
  'backbone.localStorage',
  './datasource'
], function(Backbone, BackboneLocalStorage, Datasource) {

  var constructor = Backbone.Collection;

  var Collection = constructor.extend({
    model: Datasource,
    localStorage: new BackboneLocalStorage('datasources'),
    comparator: function(server) {
      return server.get("name");
    }
  });

  Collection.constructor = Collection;

  return new Collection;

});