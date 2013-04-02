define(['jquery'], function ($) {
  'use strict';

  return {
    'serializeObject': function (form) {
        var obj = {};
        
        $.each($(form).serializeArray(), function (i, o) {
          var n = o.name,
            v = o.value;
            
          obj[n] = obj[n] === undefined ? v
            : $.isArray(obj[n]) ? obj[n].concat(v)
            : [obj[n], v];
        });
        
        return obj;
      }
  };
});