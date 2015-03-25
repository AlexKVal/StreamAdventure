var child_process = require('child_process');
var duplexer = require('duplexer');

module.exports = function (cmd, args) {
  var child = child_process.spawn(cmd, args)
  return duplexer(child.stdin, child.stdout)
}
