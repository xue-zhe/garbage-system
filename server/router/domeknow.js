const https = require('https');

https
 .get('https://lajifenleiapp.com/sk/', function (res) {
  console.log('Got response: ' + res.statusCode);

  res.on('data', function (chunk) {
   console.log('BODY: ' + chunk);
  });
 })
 .on('error', function (e) {
  console.log('Got error: ' + e.message);
 });