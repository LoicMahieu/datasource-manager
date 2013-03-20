define([
  'backbone.relational',
  './link'
], function(Backbone, Link) {

  var constructor = Backbone.Collection;

  var Collection = constructor.extend({
    model: Link
  });

  Collection.constructor = Collection;

  return new Collection;

});