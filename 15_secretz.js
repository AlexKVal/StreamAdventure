var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar');
var through = require('through');

var tarParser = tar.Parse().on('entry', function (file) {
  if (file.type === 'File') {
    var hexmd5Stream = crypto.createHash('md5', {encoding: 'hex'})
    file.pipe(hexmd5Stream).pipe(through(write))
  }

  function write(chunk) {
    console.log(chunk.toString() +' '+ file.path);
  }
})

var cipherName = process.argv[2]
var passphrase = process.argv[3]

var decryptor = crypto.createDecipher(cipherName, passphrase)

process.stdin
  .pipe(decryptor)
  .pipe(zlib.createGunzip())
  .pipe(tarParser)
