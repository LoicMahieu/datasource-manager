define([
  'backbone',
  'jquery',
  './namespace'
], function (Backbone, $, ns) {
  'use strict';

  var Router = Backbone.Router.extend({
    routes: {
      ''                         : 'home',
      
      'datasources'              : 'datasources',
      'datasources/check'        : 'datasourceCheck',
      'datasources/new'          : 'datasourceEdit',
      'datasources/:id'          : 'datasourceEdit',
      'datasources/:id/:action'  : 'datasourceEdit',

      'servers'                  : 'servers',
      'servers/new'              : 'serverEdit',
      'servers/:id'              : 'serverEdit',
      
      'links'                    : 'links',
      'verify'                   : 'verify'
    },

    _showView: function (view, renderArgs) {
      var self = this;
      var show = function () {
        view.render.apply(view, renderArgs || []).$el.appendTo('#main-container');
        self.currentView = view.show();
      };

      if (this.currentView) {
        this.currentView.hide(show);
      } else {
        show();
      }
    },

    _toggleNav: function (name) {
      $('#main-nav')
        .find('li')
          .removeClass('active')
          .filter('[data-name=' + name + ']')
            .addClass('active');
    },

    home: function () {

    },

    datasources: function () {
      this._showView(ns.views.datasourceList);
      this._toggleNav('datasources');
    },

    datasourceCheck: function () {
      this._showView(ns.views.datasourceCheck);
      this._toggleNav('datasources');
    },

    datasourceEdit: function () {
      this._showView(ns.views.datasourceEdit, arguments);
      this._toggleNav('datasources');
    },

    servers: function () {
      this._showView(ns.views.serverList);
      this._toggleNav('servers');
    },

    serverEdit: function () {
      this._showView(ns.views.serverEdit, arguments);
      this._toggleNav('servers');
    },

    links: function () {
      this._showView(ns.views.links);
      this._toggleNav('links');
    },

    verify: function () {
      this._showView(ns.views.verifyLinks);
      this._toggleNav('verify');
    }
  });

  return Router;

});