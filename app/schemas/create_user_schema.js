const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique : true}},
  email: {type: String, required: true, index: { unique : true }},
  info:{
    name:{
      first_name: {type: String, required: true, index: { unique : true }},
      last_name: {type: String, required: true, index: { unique : true }}
    },
    country: String,
  },
  hash: String,
  salt: String
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);

