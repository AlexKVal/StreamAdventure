var http = require('http');
var through = require('through2');

var port = process.argv[2];

function write(buffer, _, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

function end(done) {
  done()
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  if (req.method === 'POST') {
    req.pipe(through(write, end)).pipe(res)
  }
}).listen(port)

// https://github.com/nodeschool/discussions/issues/989
process.on('SIGTERM', function() {
  process.exit();
});
