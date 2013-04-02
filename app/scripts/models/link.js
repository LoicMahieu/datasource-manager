define([
  'backbone'
], function (Backbone) {
  'use strict';

  var constructor = Backbone.Model;

  var Model = constructor.extend({
    relations: [{
      type: Backbone.HasMany,
      key: 'datasources',
      relatedModel: 'Datasource',
      collectionType: 'DatasourcesCollection',
      reverseRelation: {
        key: 'datasource'
      }
    }, {
      type: Backbone.HasMany,
      key: 'servers',
      relatedModel: 'Server',
      collectionType: 'ServersCollection',
      reverseRelation: {
        key: 'server'
      }
    }]
  });

  return Model;

});