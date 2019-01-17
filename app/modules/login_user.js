const bcrypt = require('bcryptjs');
const loginUser = require('../schemas/login_user');
const mongoose = require('mongoose');

module.exports = async function(send_user){
    let user = {}
    user.username = send_user.username;
    user.passowrd = send_user.passowrd;
    
}