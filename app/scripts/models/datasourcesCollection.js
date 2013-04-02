define([
  'backbone',
  './datasource',
  '../namespace'
], function (Backbone, Datasource, ns) {
  'use strict';

  var constructor = Backbone.Collection;

  var Collection = constructor.extend({
    model: Datasource,
    urlRoot: ns.apiPath + '/datasources',
    url: ns.apiPath + '/datasources',
    comparator: function (server) {
      return server.get('name');
    }
  });

  Collection.constructor = Collection;

  return new Collection();

});