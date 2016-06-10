var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
 
// load up the user model
var User = require('../app/models/user');
var config = require('../config/database');
 
var user = new User();

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  //opts.jwtFromRequest = ExtractJwt.fromHeader('auth');
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    user.findOne({id: jwt_payload.id}, function(err, userResult) {
      if (err) {
        return done(err, false);
      }
      if (userResult) {
        done(null, userResult);
      } else {
        done(null, false);
      }
    });
  }));
};