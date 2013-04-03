
var sys = require('sys');
var exec = require('child_process').exec;
var path = require('path');

var child = exec("grunt dist-server", {
  cwd: __dirname
}, function(err, stdout, stderr) {
	if(err !== null) {
		console.log('exec error: ' + err);
	}
});

child.stdout.on('data', function (d) {
  sys.print(d);
});
