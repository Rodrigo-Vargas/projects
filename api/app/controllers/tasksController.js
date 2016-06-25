'use strict';

var Task = require('../models/task');
var User = require('../models/user');

function TasksController () { }

TasksController.add = function(req, res){
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

  var newTask = new Task();

  newTask.customer_id = customer.id;
  newTask.description = req.body.description;
  newTask.start = req.body.start;
  newTask.conclusion = req.body.conclusion;

  newTask.save(function(err, result){
    if (err) {
      return res.json({success: false, msg: 'Task already exists.', error : err});
    }
    res.json({success: true, msg: 'Successful created new task.'});
  });
}

TasksController.getByUser = function(req, res){
  User.findOne({
    'email': req.user.email
  }, 
  function(err, user) {
    if (err) 
      throw err;

    if (!user) {
      return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
    } 
    else
    {
      Task.find(false, function(err, results){
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
}

TasksController.destroy = function(req, res) {
  Task.remove({ id: req.body.id }, function(err) {
    if (err)
      throw err;
    
    res.json({ success: true });      
  });
}

module.exports = TasksController;