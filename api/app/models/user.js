var record    = require('pg-record');
var bcrypt    = require('bcrypt-nodejs');

var userSchema = record.Schema({
  email : 'Text',
  password : 'Text'
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = record.model('User', userSchema);
