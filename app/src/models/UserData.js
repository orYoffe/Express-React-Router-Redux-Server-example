var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  title: {type: String, required: true},
  content: String,
  author: String
}, {collection: 'user-data'});

module.exports =  mongoose.model('UserData', userDataSchema);
