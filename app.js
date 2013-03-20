var sys = require('sys');

var exec = require('child_process').exec;


var child = exec("grunt server", function(err, stdout, stderr) {
	sys.print('stdout: ' + stdout);
	sys.print('stderr: ' + stderr);
	if(err !== null) {
		console.log('exec error: ' + err);
	}
})