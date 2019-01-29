const bcrypt = require('bcryptjs');
const userScheme = require('../schemas/create_user_schema');

module.exports = function(send_user){
    let user = {}
    user.email = send_user.email;
    user.id = Date.now();
    user.first = send_user.first;
    user.last = send_user.second;
    user.country = send_user.country;
    
    let password = send_user.password;
    let tempPassword = password;

    if(validate_email(user.email)){
        bcrypt.genSalt(12,function(err,salt){
            if(err)throw err;
            console.log(salt);
    
            bcrypt.hash(tempPassword, salt, function(err,hash){
                if(err)throw err;
                console.log(hash);
                user.salt = salt;
                user.hash = hash;
                saveUser(user);
            });
        });
    }
    else{
        console.log("user failed");
    }

}

function validate_email(email) {
    var re =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(re)
    {
        return re.test(String(email).toLowerCase());
    }
    else{
        return false;
    }
}

function saveUser(userObj){

    var newUser = new userScheme;
    
    newUser.username = userObj.email;
    newUser.email = userObj.email;
    newUser.info.name.first_name = userObj.first;
    newUser.info.name.last_name = userObj.last;
    newUser.info.country = userObj.country; 
    newUser.hash = userObj.hash;
    newUser.salt = userObj.salt;
    
    newUser.save(function(err, res){
        if(err) throw err;
        else{
            console.log(res);
        }
    });

}
