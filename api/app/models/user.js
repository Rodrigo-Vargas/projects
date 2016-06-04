var record = require('pg-record');

var userSchema = record.Schema({
  email : 'Text',
  password : 'Text'
});

module.exports = record.model('User', userSchema);