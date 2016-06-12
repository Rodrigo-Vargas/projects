'use strict';

var User           = require('../models/user');
var UsersController    = require('../controllers/usersController');
var Customer       = require('../models/customer');
var Task           = require('../models/task');
var Helpers        = require('../helpers');

module.exports = function (app, jwt, passport) {
  var helpers = new Helpers();
  var userInstance = new User();
  var taskInstance = new Task();
  var customerInstance = new Customer();

  app.post('/api/signup', UsersController.signup);

  app.post('/api/login', UsersController.login);

  app.post('/api/customers/add', passport.authenticate('jwt', { session: false}), function(req, res){
    if (!req.body.name)
    {
      res.json({success: false, msg: 'Please pass name.'});
    }
    else 
    {
      var newCustomer = new Customer();

      newCustomer.name = req.body.name;
      newCustomer.user_id = 1;

      newCustomer.save(function(err, result){
        if (err) {
          return res.json({success: false, msg: 'Customer already exists.', error : err});
        }
        res.json({success: true, msg: 'Successful created new customer.'});
      });      
    }
  });

  app.get('/api/customers/getByUser', passport.authenticate('jwt', { session: false}), function(req, res) {
    userInstance.findOne({
        'email': req.user.email
      }, function(err, user) {
        if (err) 
          throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } 
        else
        {
          customerInstance.find(false, function(err, results){
            var customers = [];
            for(var index = 0; index < parseInt(results.rowCount); index++){
              customers.push(results.rows[index]);
            }

            res.json({ success: true, customers : customers });
          })
        }
      });
  });

  app.post('/api/tasks/add', passport.authenticate('jwt', { session: false}), function(req, res){
    var customer = req.body.customer;

    if (!customer)
    {
      res.json({success: false, msg: 'Paramater customer mismatch'});
      return;
    }

    if (!req.body.description)
    {
      res.json({success: false, msg: 'Paramater description mismatch'});
      return;
    }

    if (!req.body.start || !req.body.conclusion)
    {
      res.json({success: false, msg: 'Paramater start or conclusion mismatch'});
      return;
    }

    var taskInstance = new Task();

    taskInstance.customer_id = customer.id;
    taskInstance.description = req.body.description;
    taskInstance.start = req.body.start;
    taskInstance.conclusion = req.body.conclusion;

    taskInstance.save(function(err, result){
      if (err) {
        return res.json({success: false, msg: 'Task already exists.', error : err});
      }
      res.json({success: true, msg: 'Successful created new task.'});
    });
  });

  app.get('/api/tasks/getByUser', passport.authenticate('jwt', { session: false}), function(req, res){
    userInstance.findOne({
        'email': req.user.email
      }, function(err, user) {
        if (err) 
          throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } 
        else
        {
          taskInstance.find(false, function(err, results){
            var tasks = [];
            for(var index = 0; index < parseInt(results.rowCount); index++){
              tasks.push(results.rows[index]);
            }
            var agenda = [
                            {
                              tasks : tasks
                            }
                         ];

            res.json({ success: true, agenda : agenda } );
          })
        }
      });
  });
  
  app.get('*', function(req, res) {
    res.sendfile('./dist/index.html');
  });
};