require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    'backbone.bootstrapModal': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    'backbone.relational': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: '$'
    },
    dust: {
      exports: 'dust'
    },
    parsley: {
      deps: ['jquery'],
      exports: '$'
    }
  },

  paths: {
    'text': 'vendor/requirejs/text',

    'async': 'vendor/async',

    'jquery': 'vendor/jquery.min',
    'parsley': 'vendor/parsley.full',

    'bootstrap': 'vendor/bootstrap/bootstrap',

    'dust': 'vendor/dust-full-0.6.0',
    'rdust': 'vendor/require-dust',

    'underscore': '../components/underscore/underscore',
    'backbone': '../components/backbone/backbone',
    'backbone.localStorage': 'vendor/backbone.localStorage',
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
  './views/datasourceCheck',
  './views/serverList',
  './views/serverEdit',
  './views/links',
  './views/verifyLinks',

  './models/server',
  './models/datasource'

  //if you to import the export_datasource uncomment this
  //,'./import'
], function (
  Backbone,
  $,

  ns,
  Router,

  DatasourceListView,
  DatasourceEditView,
  DatasourceCheckView,
  ServerList,
  ServerEdit,
  Links,
  VerifyLinks,

  ServerModel,
  DatasourceModel
) {
  'use strict';

  ns.models.Server = ServerModel;
  ns.models.Datasource = DatasourceModel;

  Backbone.Relational.store.addModelScope(ns.models);

  ns.router = new Router();

  ns.views.datasourceList = new DatasourceListView();
  ns.views.datasourceEdit = new DatasourceEditView();
  ns.views.datasourceCheck = new DatasourceCheckView();
  ns.views.serverList = new ServerList();
  ns.views.serverEdit = new ServerEdit();
  ns.views.links = new Links();
  ns.views.verifyLinks = new VerifyLinks();


  $(function () {

    Backbone.history.start();

  });

});