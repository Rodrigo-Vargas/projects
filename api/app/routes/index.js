'use strict';

var User            = require('../models/user');

module.exports = function (app, client, jwt) {
  var db = client;

  app.post('/api/signup', function(req, res) {    
    if (!req.body.email || !req.body.password)
    {
      res.json({success: false, msg: 'Please pass email and password.'});
    }
    else 
    {
      var user = new User();
      user.email = req.body.email;
      user.password = req.body.password;

      user.save(function(err, result){
        if (err) {
          return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });      
    }
  });

  app.post('/api/login', function(req, res)
  {
    var email = req.body.email;
    
    db.query(
      'SELECT * FROM users where email = ($1)', [email],
      function(err, result) {
        if(result.rows.length > 0)
        {
          var token = jwt.encode(result.rows[0].password, '1234');
          res.json({success: true, token: 'JWT ' + token});
        }
      }      
    );    
  });
  
  app.get('*', function(req, res) {
    res.sendFile('/dist/index.html');
  });
};