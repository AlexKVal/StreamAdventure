var request = require('request');

var rp = request.post('http://localhost:8099')

process.stdin.pipe(rp).pipe(process.stdout)
