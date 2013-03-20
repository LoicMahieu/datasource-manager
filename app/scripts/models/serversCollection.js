define([
  'backbone',
  './server',
  '../namespace'
], function(Backbone, Server, ns) {

  var constructor = Backbone.Collection;

  var Collection = constructor.extend({
    model: Server,
    urlRoot: ns.apiPath + '/servers',
    url: ns.apiPath + '/servers',
    comparator: function(server) {
      return server.get("reference");
    }
  });

  Collection.constructor = Collection;

  return new Collection;

});