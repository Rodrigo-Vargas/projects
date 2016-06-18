'use strict';

var UsersController       = require('../controllers/usersController');
var CustomersController   = require('../controllers/customersController');

var Task                  = require('../models/task');

module.exports = function (app, jwt, passport) {
  var taskInstance = new Task();
  
  app.post('/api/signup', UsersController.signup);

  app.post('/api/login', UsersController.login);

  app.post('/api/customers/add', passport.authenticate('jwt', { session: false}), CustomersController.add);

  app.get('/api/customers/getByUser', passport.authenticate('jwt', { session: false}), CustomersController.getByUser);

  app.post('/api/customers/destroy', passport.authenticate('jwt', { session: false}), CustomersController.destroy);

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