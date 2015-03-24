var through = require('through2')
  , split    = require('split')

var stateIsEven = false

function write(line, enc, next) {
  line = line.toString()

  if (stateIsEven) {
    line = line.toUpperCase()
  } else {
    line = line.toLowerCase()
  }
  stateIsEven = ! stateIsEven

  line += '\n'
  this.push(line)
  next()
}

process.stdin
  .pipe(split())
  .pipe(through(write))
  .pipe(process.stdout)
