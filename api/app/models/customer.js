var record    = require('pg-record');

var customerSchema = record.Schema({
  user_id : 'Integer',
  name : 'Text'
});

module.exports = record.model('Customer', customerSchema);
