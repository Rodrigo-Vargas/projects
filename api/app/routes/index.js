'use strict';

module.exports = function (app, db, jwt, passport) {
  app.get('/', function(req, res) {
    //res.sendfile('./public/index.html');
    res.send('teste');
  });
};