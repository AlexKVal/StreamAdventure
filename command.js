var through = require('through2');
var split = require('split');
var combine = require('stream-combiner2');
var offset = Number(process.argv[2]);

var tr = combine(split(), through(write));
process.stdin.pipe(tr).pipe(process.stdout);

function write (buf, _, next) {
  var line = buf.toString();
  this.push(line.toUpperCase() + '\n');
  next();
}
