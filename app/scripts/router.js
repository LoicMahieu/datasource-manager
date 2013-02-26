define([
  'backbone',
  './namespace'
], function(Backbone, ns) {

  var Router = Backbone.Router.extend({
    routes: {
      ''                       : 'home',
      
      'datasources'            : 'datasources',
      'datasources/new'        : 'datasourceEdit',
      'datasources/:id'        : 'datasourceEdit',

      'servers'                : 'servers',
      'servers/new'            : 'serverEdit',
      'servers/:id'            : 'serverEdit',
      
      'links'                  : 'links',
      'apply'                  : 'applyRules'
    },

    _showView: function(view, renderArgs) {
      var self = this;
      var show = function() {
        view.render.apply(view, renderArgs || []).$el.appendTo('#main-container');
        self.currentView = view.show();
      };

      if( this.currentView ) {
        this.currentView.hide(show);
      } else {
        show();
      }
    },

    _toggleNav: function(name) {
      $('#main-nav')
        .find('li')
          .removeClass('active')
          .filter('[data-name='+ name +']')
            .addClass('active');
    },

    home: function() {

    },

    datasources: function() {
      this._showView(ns.views.datasourceList);
      this._toggleNav('datasources');
    },

    datasourceEdit: function(id) {
      this._showView(ns.views.datasourceEdit, arguments);
      this._toggleNav('datasources');
    },

    servers: function() {
      this._showView(ns.views.serverList);
      this._toggleNav('servers');
    },

    serverEdit: function(id) {
      this._showView(ns.views.serverEdit, arguments);
      this._toggleNav('servers');
    },

    links: function() {
      this._showView(ns.views.links);
      this._toggleNav('links');
    },

    applyRules: function() {
      this._showView(ns.views.applyRules);
      this._toggleNav('');
    }
  });

  return Router;

});