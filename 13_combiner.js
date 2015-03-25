var combine = require('stream-combiner')
  , through = require('through')
  , split   = require('split')
  , zlib    = require('zlib')


module.exports = function () {
  var currentGenre, resultLines = []

  return combine(
    split(),
    through(write, end),
    zlib.createGzip()
  )

  function write(line) {
    if (line === '') return //ignore empty lines
    line = JSON.parse(line)

    if (line.type == 'genre') {
      currentGenre = { name: line.name, books: [] }
      resultLines.push(currentGenre)
    } else { // book
      currentGenre.books.push(line.name)
    }
  }

  function end() {
    resultLines = resultLines.map(function (lineObj) {
      return JSON.stringify(lineObj)
    }).join('\n')

    this.queue(resultLines)
    this.queue(null)
  }
}
