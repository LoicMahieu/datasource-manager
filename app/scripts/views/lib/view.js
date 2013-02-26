define([
  'backbone'
], function(Backbone) {

  var constructor = Backbone.View;

  var View = constructor.extend({
    initialize: function() {
      this.hidden = true;
      this.rendered = false;
    },

    render: function() {
      var view = this;

      if( this.rendered ) {
        return view;
      }

      if( this.template ) {
        this.template.render({}, function(err, output) {
          $(view.el).html(output);
          view.rendered = true;
        });
      }

      return view;
    },

    hide: function(cb) {
      if( !this.hidden ) {
        this.$el.hide();
        this.hidden = true;
      }

      if( cb ) cb();
      this.trigger('hide');

      return this;
    },

    show: function(cb) {
      if( this.hidden ) {
        this.$el.show();
        this.hidden = false;
      }
      
      if( cb ) cb();
      this.trigger('show');

      return this;
    }
  });

  return View;

});