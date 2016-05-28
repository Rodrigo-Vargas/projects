/* Npm packages */
var express = require('express');
var morgan  = require('morgan');

var app 	= express();

var routes  = require('./app/routes/index.js');

var port = process.env.PORT || 3000;

app.use(morgan('dev'));

routes(app);

app.listen(port, function () {
  console.log('Node.js listening on port ' + port + '...');
});