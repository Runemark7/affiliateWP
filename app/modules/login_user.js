const bcrypt = require('bcryptjs');
const loginUser = require('./../schemas/login_user_shema');

module.exports = async function(send_user){
    return new Promise(function(resolve, reject){
        loginUser.findOne({ username : send_user.username }, function(err,result){
            if(err){
                reject(err);
            }
            else{
                var objResult = result.toObject();
                var dbPassword = objResult.hash;
                var sentPassword = send_user.password;
                bcrypt.compare(sentPassword, dbPassword, function(err, result){
                    if(result)
                    {   
                        resolve(objResult);
                    }
                    else{
                        reject(false);
                    }
                });
            }
        });
    });
}