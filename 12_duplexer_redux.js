var duplexer = require("duplexer2")
  , stream   = require('stream')

module.exports = function (counter) {
  var counters = {}

  var writable = new stream.Writable({objectMode: true})
  writable._write = function (chunk, enc, done) {
    counters[chunk.country] = counters[chunk.country] || 0
    counters[chunk.country] += 1
    // console.log(counters[chunk.country]);
    done()
  }

  writable.once('finish', function () {
    counter.setCounts(counters)
  })

  return duplexer(writable, counter)
}
