var child_process = require('child_process')
  , Duplex = require('stream').Duplex

function DuplexThrough(options, writable, readable) {

  if (typeof readable === 'undefined') {
    readable = writable
    writable = options
    options = null
  }

  options = options || {}

  Duplex.call(this, options)

  this._writable = writable
  this._readable = readable

  var self = this

  readable.on('data', function (e) {
    if (!self.push(e)) {
      readable.pause()
    }
  })

  writable.once('finish', function () {
    self.end()
  })

  this.once('finish', function () {
    writable.end()
  })

  readable.once('end', function () {
    return self.push(null)
  })
}
DuplexThrough.prototype =
  Object.create(Duplex.prototype, {constructor: {value: DuplexThrough}})

DuplexThrough.prototype._write =
  function (chunk, enc, next) {
    this._writable.write(chunk, enc, next)
  }

DuplexThrough.prototype._read =
  function (n) {
    this._readable.resume()
  }

module.exports = function (cmd, args) {
  var child = child_process.spawn(cmd, args)
  return new DuplexThrough(child.stdin, child.stdout)
}
