define([
  'backbone.relational',
  'backbone.localStorage',
  './link'
], function(Backbone, BackboneLocalStorage, Link) {

  var constructor = Backbone.Collection;

  var Collection = constructor.extend({
    model: Link,
    localStorage: new BackboneLocalStorage('links')
  });

  Collection.constructor = Collection;

  return new Collection;

});