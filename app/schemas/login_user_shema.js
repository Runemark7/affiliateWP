const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var loginSchema = new Schema({
    username : { type: String, required: true, index:{unique:true} },
    password : { type: String, required: true }
})

module.exports = mongoose.model("users", loginSchema);