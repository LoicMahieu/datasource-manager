require.config({
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    "backbone.localStorage": {
      deps: ["backbone"],
      exports: "Backbone.LocalStorage"
    },
    "backbone.bootstrapModal": {
      deps: ["backbone"],
      exports: "Backbone.BootstrapModal"
    },
    "backbone.relational": {
      deps: ["backbone"],
      exports: "Backbone"
    },
    bootstrap: {
      deps: ["jquery"],
      exports: "$"
    },
    dust: {
      exports: "dust"
    },
    parsley: {
      deps: ["jquery"],
      exports: "$"
    }
  },

  paths: {
    "text": 'vendor/requirejs/text',

    "async": 'vendor/async',

    "jquery": 'vendor/jquery.min',
    "parsley": 'vendor/parsley.full',

    "bootstrap": 'vendor/bootstrap/bootstrap.min',

    "dust": 'vendor/dust-full-0.6.0',
    "rdust": 'vendor/require-dust',

    "underscore": '../components/underscore/underscore',
    "backbone": '../components/backbone/backbone',
    "backbone.localStorage": 'vendor/backbone.localStorage',
    'backbone.bootstrapModal': 'vendor/backbone.bootstrap-modal',
    'backbone.relational': 'vendor/backbone.relational'
  }
});
 
require([
  'backbone.relational',
  'jquery',

  './namespace',
  './router',
  
  './views/datasourceList',
  './views/datasourceEdit',
  './views/serverList',
  './views/serverEdit',
  './views/links',
  './views/applyRules',

  './models/server',
  './models/datasource',
  './models/link'
], function(
  Backbone, 
  $, 

  ns,
  Router, 

  DatasourceListView, 
  DatasourceEditView, 
  ServerList, 
  ServerEdit, 
  Links,
  ApplyRules, 

  ServerModel,
  DatasourceModel,
  LinkModel
) {

  ns.models.Server = ServerModel;
  ns.models.Datasource = DatasourceModel;
  ns.models.Link = LinkModel;

  Backbone.Relational.store.addModelScope(ns.models);

  ns.router = new Router();

  ns.views.datasourceList = new DatasourceListView();
  ns.views.datasourceEdit = new DatasourceEditView();
  ns.views.serverList = new ServerList();
  ns.views.serverEdit = new ServerEdit();
  ns.views.links = new Links();
  ns.views.applyRules = new ApplyRules();

  $(function() {

    Backbone.history.start();

  });

});