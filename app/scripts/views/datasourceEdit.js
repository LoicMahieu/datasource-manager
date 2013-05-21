define([
  'parsley',
  './lib/view',
  '../util',
  '../namespace',
  'rdust!../../views/datasource_edit',
  '../models/datasourcesCollection'
], function ($, View, util, ns, template, datasources) {
  'use strict';

  var constructor = View;

  var DatasourceEdit = constructor.extend({
    template: template,

    events: {
      'submit form': 'submitForm',
      'click .btn-advanced': 'showAdvanced'
    },

    render: function (id, action) {
      var view = this;
      var datasource = this.model = datasources.get(id) || new datasources.model();
      var data = {
        datasource: (datasource ? datasource.toJSON() : {}),
        edit: typeof datasource !== 'undefined'
      };

      if (action === 'duplicate') {
        data.edit = false;
        data.datasource.name = data.datasource.name + '_copy';
        datasource = this.model = new datasources.model();
      }

      this.template.render(data, function (err, output) {
        var $el = $(view.el);
        $el.html(output);

        $el.find('form').parsley();

        view.rendered = true;
      });

      return this;
    },

    submitForm: function (e) {
      e.preventDefault();

      var $form = $(e.currentTarget);
      var data = util.serializeObject($form);
      data.version = this.model.get('version');

      this.model.set({
        name: data.name,
        database: data.database,
        host: data.host,
        port: data.port,
        username: data.username,
        password: data.password,

        description: data.description,

        args: data.args,

        enablemaxconnections: data.enablemaxconnections === 'true',
        maxconnections: data.maxconnections,

        pooling: data.pooling === 'true',
        
        timeout: data.timeout,
        interval: data.interval,

        disable: data.disable === 'true',

        login_timeout: data.login_timeout,

        enable_clob: data.enable_clob === 'true',
        enable_blob: data.enable_blob === 'true',

        buffer: data.buffer,
        blob_buffer: data.blob_buffer,

        disable_autogenkeys: data.disable_autogenkeys === 'true',

        alter: data.alter === 'true',
        grant: data.grant === 'true',
        update: data.update === 'true',
        delete: data.delete === 'true',
        create: data.create === 'true',
        storedproc: data.storedproc === 'true',
        insert: data.insert === 'true',
        drop: data.drop === 'true',
        revoke: data.revoke === 'true',
        select: data.select === 'true',

        version: data.version,

        validationQuery: data.validationQuery
      });

      datasources.add(this.model).sort();

      this.model.save();

      ns.router.navigate($form.attr('action'), { replace: true });
    },

    showAdvanced: function (e) {
      e.preventDefault();
      this.$el.find('.advanced-settings').show();
    }
  });

  return DatasourceEdit;

});