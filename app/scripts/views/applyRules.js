define([
  'async',
  '../namespace',
  './lib/view',
  'rdust!../../views/applyRules',
  '../models/datasourcesCollection',
  '../models/serversCollection',
  '../lib/cfagent',
], function(async, ns, View, template, datasources, servers, CFAgent) {

  var constructor = View, proto = View.prototype;

  var View = constructor.extend({
    template: template,

    initialize: function() {
      this.on('show', function() {
        if( confirm('Are you sure?') ) {
          this.applyRules();
        } else {
          ns.router.navigate('/');
        }
      });
    },

    applyRules: function() {
      var $output = this.$el.find('.output').html('');

      servers.each(function(server) {
        var $title = $('<h3 />').text(server.get('reference')),
            $list = $('<ul />'),
            $progress = $('<div />', { class: 'progress progress-striped active' }),
            $progressBar = $('<div />', { class: 'bar', style: 'width: 0%' }),
            dbs = server.getDatasources(),
            success = 0,
            fail = 0,
            cfagent = CFAgent.createFromServer(server),
            callTasks = [];

        dbs.each(function(db) {
          var $label = $('<span />')
            .addClass('label label-warning')
            .text('Pending...');

          var $li = $('<li />')
            .append($label)
            .append($('<span />').text(db.get('name')))
            .appendTo($list);

          var doCall = function(next) {
            var call = cfagent.setDatasource(db);

            var callEnd = function() {
              if( success + fail == dbs.length ) {
                $progress.removeClass('progress-striped active');
              }
            };

            var callFail = function() {
              fail++;
              $label.removeClass('label-warning').addClass('label-important');
              callEnd();
              next();
            };

            call.done(function(data) {
              if( !data.success ) {
                callFail();
                return;
              }
              success++;
              $progressBar.css('width', ((success / dbs.length) * 100) + '%');
              $label.removeClass('label-warning').addClass('label-success');
              callEnd();
              next();
            });

            call.fail(callFail);

            console.log(db);
          };

          callTasks.push(doCall);
        });

        async.series(callTasks);

        $progressBar.appendTo($progress);

        $title.appendTo($output);
        $list.appendTo($output);
        $progress.appendTo($output);
      });
    },

    _applyServer: function() {

    }
  });

  return View;

});