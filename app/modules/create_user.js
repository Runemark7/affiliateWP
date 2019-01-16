const bcrypt = require('bcryptjs');
const database = require('./../class/Db');

module.exports = function(send_user){
    let user = {}
    user.email = send_user.email;
    user.id = Date.now();
    user.first = send_user.first;
    user.second = send_user.second;
    
    let password = send_user.password;
    let tempPassword = password;

    bcrypt.genSalt(12,function(err,salt){
        if(err)throw err;
        console.log(salt);

        bcrypt.hash(tempPassword, salt, function(err,hash){
            if(err)throw err;
            console.log(hash);

            user.password = hash;
            saveUser(user,password);
        });
    });
}

function saveUser(userObj, user_pwd){

    var personSchema = mongoose.Schema({
        name: "ola",
        age: 7,
        nationality: "sweden"
    });
    
    var Person = mongoose.model("accounts", personSchema);
}
