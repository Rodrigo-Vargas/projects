'use strict';

var UsersController       = require('../controllers/usersController');
var CustomersController   = require('../controllers/customersController');
var TasksController   = require('../controllers/tasksController');

module.exports = function (app, jwt, passport) {
  app.post('/api/signup', UsersController.signup);

  app.post('/api/login', UsersController.login);

  app.post('/api/customers/add', passport.authenticate('jwt', { session: false}), CustomersController.add);

  app.get('/api/customers/getByUser', passport.authenticate('jwt', { session: false}), CustomersController.getByUser);

  app.post('/api/customers/destroy', passport.authenticate('jwt', { session: false}), CustomersController.destroy);

  app.post('/api/tasks/add', passport.authenticate('jwt', { session: false}), TasksController.add);

  app.get('/api/tasks/getByUser', passport.authenticate('jwt', { session: false}), TasksController.getByUser);
  
  app.post('/api/tasks/destroy', passport.authenticate('jwt', { session: false}), TasksController.destroy);
  
  app.get('*', function(req, res) {
    res.sendfile('./dist/index.html');
  });
};