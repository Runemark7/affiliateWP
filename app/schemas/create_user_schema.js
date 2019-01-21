const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
var UserSchema = new Schema({
  username: {type: String, required: true, createIndexes: { unique : true}},
  email: {min:6, max:40, type: String, required: true, createIndexes: { unique : true }},
  info:{
    name:{
      first_name: {type: String, required: true},
      last_name: {type: String, required: true}
    },
    country: {type: String, required: true}
  },
  hash: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);

