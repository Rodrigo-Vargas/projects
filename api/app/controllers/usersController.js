'use strict';
var jwt           = require('jsonwebtoken');

var User          = require('../models/user');
var Config        = require('../../config/database');

var userInstance = new User();

function UsersController () { }

UsersController.signup = function(req, res) {    
  if (!req.body.email || !req.body.password)
    return res.json({success: false, message: 'Please pass email and password.'});
  
  User.findOne( { email : req.body.email}, function(err, user){
    if (user)
      return res.json({success: false, message: 'Username already exists.'}); 

    var newUser = new User();

    newUser.email = req.body.email;
    newUser.password = newUser.generateHash(req.body.password);

    newUser.save(function(err, result){
      if (err) {
        return res.json({success: false, msg: 'Error ' + err});
      }

      var token = jwt.sign(newUser, Config.secret);

      res.json({
                  success: true, 
                  msg: 'Successful created new user.',
                  token: "JWT " + token});
    });
  });
}

UsersController.login = function(req, res) {
  User.findOne({ 'email' : req.body.email}, function(err, user){
    if (err) 
      throw err;

    if (!user)
    {
      res.json({success: false, message: 'Check your email address and/or password'});
      return;
    }

    if (!user.validPassword(req.body.password))
    {
      res.json({success: false, message: 'Check your email address and/or password'});
      return;
    }

    var token = jwt.sign({ id:  user.id, email : user.email }, Config.secret);

    res.json({success: true, token: "JWT " + token});
  });   
}

module.exports = UsersController;