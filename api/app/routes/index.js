'use strict';

var User            = require('../models/user');
var Config          = require('../../config/database');

module.exports = function (app, jwt) {
  app.post('/api/signup', function(req, res) {    
    if (!req.body.email || !req.body.password)
    {
      res.json({success: false, msg: 'Please pass email and password.'});
    }
    else 
    {
      var newUser = new User();

      newUser.email = req.body.email;
      newUser.password = newUser.generateHash(req.body.password);

      newUser.save(function(err, result){
        if (err) {
          console.log(err);
          return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });      
    }
  });

  app.post('/api/login', function(req, res)
  {
    var user = new User();

    user.findOne({ 'email' : req.body.email}, function(err, user){
      if (err) 
        throw err;

      if (!user)
      {
        res.send({success: false, message: 'Authentication failed. User not found.'});
        return;
      }

      if (!user.validPassword(req.body.password))
      {
        res.send({success: false, message: 'Authentication failed. Wrong password.'});
        return;
      }

      var token = jwt.encode(user, Config.secret);

      res.json({success: true, token: 'JWT ' + token});
    });   
  });
  
  app.get('*', function(req, res) {
    res.sendfile('./dist/index.html');
  });
};