define([
  'backbone.relational',
  'backbone.localStorage',
  './server'
], function(Backbone, BackboneLocalStorage, Server) {

  var constructor = Backbone.Collection;

  var Collection = constructor.extend({
    model: Server,
    localStorage: new BackboneLocalStorage('servers'),
    comparator: function(server) {
      return server.get("reference");
    }
  });

  Collection.constructor = Collection;

  return new Collection;

});