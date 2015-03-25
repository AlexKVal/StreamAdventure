var child_process = require('child_process')
  , stream = require('stream')
  , inherits = require('util').inherits

var Duplex = stream.Duplex
var PassThrough = stream.PassThrough

function DuplexThrough(options) {
  if (!(this instanceof DuplexThrough))
    return new DuplexThrough(options)

  Duplex.call(this, options)

  this.inRStream  = new PassThrough()
  this.outWStream = new PassThrough()

  this._readHandlersAreSet = false
}
inherits(DuplexThrough, Duplex)

DuplexThrough.prototype._write = function (chunk, enc, next) {
  this.inRStream.write(chunk, enc, next)
}

DuplexThrough.prototype._read = function (n) {
  this.outWStream.read(n)
}

module.exports = function (cmd, args) {
  var child = child_process.spawn(cmd, args)

  var duplex = new DuplexThrough()
  child.stdout.pipe(duplex.inRStream)
  duplex.outWStream.pipe(child.stdin)
  return duplex
}
