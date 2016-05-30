'use strict';

module.exports = function (app, client, jwt) {
  var db = client;

  app.post('/api/signup', function(req, res) {    
    if (!req.body.email || !req.body.password)
    {
      res.json({success: false, msg: 'Please pass email and password.'});
    }
    else 
    {     
      db.query(
        'INSERT into users (email, password) VALUES($1, $2) RETURNING id', 
        [req.body.email, req.body.password], 
        function(err, result) {
          if (err) {
              res.json({success: false, msg: err});
          } else {
              res.json({success: true, msg: 'User created.'});
          }
        }
      );
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