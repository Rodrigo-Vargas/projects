/* Npm packages */
var express = require('express');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var jwt        = require('jwt-simple');

var app 	= express();

var routes  = require('./app/routes/index.js');

var port = process.env.PORT || 3000;

var record    = require('pg-record');

record.connect({
                user: 'projects',
                password: 'projects',
                database: 'projects',
                host: 'localhost'
              });

app.use(morgan('dev'));
app.use(express.static(__dirname + '/dist'));
app.use('/models', express.static(process.cwd() + '/app/models'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app, jwt);

app.listen(port, function () {
  console.log('Node.js listening on port ' + port + '...');
});

