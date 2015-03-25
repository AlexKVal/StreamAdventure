var through2 = require('through2');
var tr = require('trumpet')();

function write(buf, end, next) {
  this.push(buf.toString().toUpperCase())
  next()
}

tr.selectAll('.loud', function (loud) {
  var loudStream = loud.createStream()
  loudStream.pipe(through2(write)).pipe(loudStream)
})

process.stdin.pipe(tr).pipe(process.stdout)
