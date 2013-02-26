define([
  'backbone.relational',
  'backbone.localStorage'
], function(Backbone, BackboneLocalStorage) {

  var constructor = Backbone.RelationalModel;

  var Model = constructor.extend({
    localStorage: new BackboneLocalStorage('servers'),
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