var through = require('through2');

function write(buffer, encoding, next) {
  // this.push('I got some data: ' + buffer.toString() + '\n');
  this.push(buffer.toString().toUpperCase());
  next();
}

// function end() {
//   this.push(null); //default
// }

var tr_stream = through(write); //, end);

process.stdin.pipe(tr_stream).pipe(process.stdout);
