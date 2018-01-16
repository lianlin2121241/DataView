var cp = require('child_process');
var path = require('path');
var fs = require('fs');
var out = fs.openSync(path.join(__dirname, '../dclogs', 'out.log'), 'a');
var err = fs.openSync(path.join(__dirname, '../dclogs', 'err.log'), 'a');

function start() {
	console.log('start datacenter')
	var maliang = cp.spawn('node', [path.join(__dirname, 'app.js')], {
		detached: true,
		stdio: ['ignore', out, err]
	});

	maliang.on('close', function () {
		console.log('close restart!!!', arguments)
		start();
	})

}

start();
