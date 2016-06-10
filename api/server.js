/* Npm packages */
var express    = require('express');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var jwt        = require('jsonwebtoken');
var passport   = require('passport');
var record     = require('pg-record');

var app 	= express();

var routes  = require('./app/routes/index.js');

var port = process.env.PORT || 3000;

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

app.use(passport.initialize());
require('./config/passport')(passport);

routes(app, jwt, passport);

app.listen(port, function () {
  console.log('Node.js listening on port ' + port + '...');
});

