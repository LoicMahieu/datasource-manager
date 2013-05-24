define([
  'jquery'
], function ($) {
  'use strict';

  var eventScope = 'btn-switch',
      left = 'btn-switch-left',
      right = 'btn-switch-right';

  var BtnSwitch = function ($el) {
    this.$el = $($el);

    this.$el.on('click', $.proxy(this._onClick, this));
  };

  BtnSwitch.prototype._onClick = function () {
    this.$el.toggleClass(left + ' ' + right);
    this.$el.trigger(
      eventScope + '.' + (this.$el.hasClass(left) ? 'activate' : 'desactivate')
    );
  };

  $.fn.btnSwitch = function () {
    this.each(function() {
      var btn = new BtnSwitch(this);
    });
  };

  $.fn.hasClassLeft = function () {
    return this.hasClass(left);
  };

  return BtnSwitch;

});