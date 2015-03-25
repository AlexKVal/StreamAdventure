var child_duplex = require('./11_duplexer_with.js');
var path = require('path');

var words = [
    'beetle',
    'biscuit',
    'bat',
    'bobbin',
    'bequeath',
    'brûlée',
    'byzantine',
    'bazaar',
    'blip',
    'byte',
    'beep',
    'boop',
    'bust',
    'bite',
    'balloon',
    'box',
    'beet',
    'boolean',
    'bake',
    'bottle',
    'bug',
    'burrow'
];

var n = 1 + Math.floor(Math.random() * 25);
// console.log('n:',n);

var stream = child_duplex(process.execPath, [path.resolve(__dirname, 'command.js'), n]);

stream.pipe(process.stdout);

// var iv = setInterval(function () {
//   if (words.length) {
//     stream.write(words.shift());
//   } else {
//     clearInterval(iv);
//     stream.end();
//   }
// }, 50);

words.forEach(function (word) {
  stream.write(word+' ');
})
stream.end();
