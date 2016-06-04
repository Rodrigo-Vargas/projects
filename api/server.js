/* Npm packages */
var express = require('express');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var jwt        = require('jwt-simple');

var app 	= express();

var routes  = require('./app/routes/index.js');

var port = process.env.PORT || 3000;

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || "postgresql://projects:projects@localhost/projects";

pg.connect(connectionString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }

  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/dist'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  routes(app, client, jwt);

  app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
  });
});

