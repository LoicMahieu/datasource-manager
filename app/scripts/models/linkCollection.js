define([
  'backbone.relational',
  './link'
], function (Backbone, Link) {
  'use strict';

  var constructor = Backbone.Collection;

  var Collection = constructor.extend({
    model: Link
  });

  Collection.constructor = Collection;

  return new Collection();

});