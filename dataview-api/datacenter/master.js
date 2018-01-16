var path = require('path');
var spawn = require('child_process').spawn;
var fs = require('fs');
var out = fs.openSync(path.join(__dirname, '../dclogs', 'watcher.log'), 'a');

var maliang = spawn('node', [path.join(__dirname, './watcher')], {
  detached: true,
  stdio: ['ignore', out, 'ignore']
});

maliang.unref();
