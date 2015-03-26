var crypto = require('crypto');

var decryptor = crypto.createDecipher('aes256', process.argv[2])

decryptor.pipe(process.stdout)

process.stdin.pipe(decryptor)
