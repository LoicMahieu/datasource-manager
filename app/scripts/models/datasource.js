define([
  'backbone',
  '../namespace'
], function(Backbone, ns) {

  var constructor = Backbone.Model;

  var Model = constructor.extend({
    urlRoot: ns.apiPath + '/datasources',
    defaults: {
      port: 3306,
      pooling: true,
      timeout: 20,
      interval: 7,
      login_timeout: 30,
      buffer: 64000,
      blob_buffer: 64000,
      select: true,
      create: true,
      grant: true,
      insert: true,
      drop: true,
      revoke: true,
      update: true,
      alter: true,
      storedproc: true,
      delete: true,
      validationQuery: 'SELECT 1 = 1'
    }
  });

  return Model;

});