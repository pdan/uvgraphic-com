var express = require('express');
var app = express();
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var consolidate = require('consolidate');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var routes = require('./routes');

app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


MongoClient.connect('mongodb://localhost:27017/portfolio', function(err, db) {
  if (err) {
    throw err;
  }

  routes(app, db, router, io);
});


http.listen(3000);
