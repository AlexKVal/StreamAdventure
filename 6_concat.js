var concat = require('concat-stream')

function reverse(buffer) {
  var rString = buffer.toString().split('').reverse().join('')
  console.log(rString);
}

process.stdin.pipe(concat(reverse))
