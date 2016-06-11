var record    = require('pg-record');

var taskSchema = record.Schema({
  customer_id : 'Integer',
  description : 'Text',
  start : 'Text',
  conclusion : 'Text'
});

module.exports = record.model('Task', taskSchema);
