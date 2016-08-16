var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;

var responseBody = {
  results: []
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/classes/messages', function (req, res) {
  res.send(200, responseBody);
});

app.post('/classes/messages', function (req, res) {
  responseBody.results.push(req.body);
  res.send(201, responseBody);
});

app.listen(port, function () {
  console.log('Listening on ' + port);
});

