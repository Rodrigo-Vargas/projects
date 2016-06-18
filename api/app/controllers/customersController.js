'use strict';

var Customer       = require('../models/customer');
var User           = require('../models/user');

var userInstance = new User();
var customerInstance = new Customer();

function CustomersController () { }

CustomersController.add = function(req, res){
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
}

CustomersController.getByUser = function(req, res) {
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
}

CustomersController.destroy = function(req, res) {
    Customer.remove({ id: req.body.id }, function(err) {
      if (err)
        throw err;
      
      res.json({ success: true });      
  });
}

module.exports = CustomersController;