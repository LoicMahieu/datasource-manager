define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.bootstrapModal'
], function($, _, Backbone, BackboneBootstrapModal) {

  var _interpolateBackup = _.templateSettings;

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /<%([\s\S]+?)%>/g
  };

  var modalTemplate = _.template('\
    <% if (title) { %>\
      <div class="modal-header">\
        <% if (allowCancel) { %>\
          <a class="close">×</a>\
        <% } %>\
        <h3>{{title}}</h3>\
      </div>\
    <% } %>\
    <div class="modal-body">{{content}}</div>\
    <div class="modal-footer">\
      <% if (allowCancel) { %>\
        <% if (cancelText) { %>\
          <a href="#" class="btn cancel">{{cancelText}}</a>\
        <% } %>\
      <% } %>\
      <a href="#" class="btn ok btn-danger">{{okText}}</a>\
    </div>\
  ');

  //Reset to users' template settings
  _.templateSettings = _interpolateBackup;
  
  var Modal = Backbone.BootstrapModal.extend({
    initialize: function(options) {
      Backbone.BootstrapModal.prototype.initialize.call(this, $.extend({
        template: modalTemplate,
        content: 'Are you sure you want to delete this one ?',
        okText: 'Delete',
        animate: true
      }, options));
    }
  });

  return Modal;

});