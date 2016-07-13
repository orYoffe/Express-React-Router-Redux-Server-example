var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
      name: {type: String, required: true},
      password: {type: String, required: true},
      admin: Boolean
  }, {collection: 'users'});

module.exports =  mongoose.model('Users', userSchema);
