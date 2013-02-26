define([
  'parsley',
  '../namespace',
  './lib/view',
  'rdust!../../views/server_edit',
  '../models/serversCollection'
], function($, ns, View, template, servers) {

  var constructor = View;

  var View = constructor.extend({
    template: template,

    events: {
      'submit form': 'submitForm'
    },

    render: function(id) {
      var view = this;
      var server = this.model = servers.get(id);
      var data = {
        server: (server ? server.toJSON() : {}),
        edit: typeof server !== 'undefined'
      };

      this.template.render(data, function(err, output) {
        var $el = $(view.el)
        $el.html(output);

        $el.find('form').parsley();

        view.rendered = true;
      });

      return this;
    },

    submitForm: function(e) {
      e.preventDefault();

      var $form = $(e.currentTarget);

      if( !this.model ) {
        this.model = new servers.model();
        servers.add(this.model);
      }

      this.model.set({
        reference: $('[name=reference]', $form).val(),
        address: $('[name=address]', $form).val(),
        password: $('[name=password]', $form).val(),
        comment: $('[name=comment]', $form).val()
      });

      this.model.save();

      ns.router.navigate($form.attr('action'), { replace: true });
    }
  });

  return View;

});