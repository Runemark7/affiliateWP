const mongoose = require('mongoose');

module.exports = function(user_id,app){

    app.users.findOne({_id : user_id}, function(err, result){
        if(err)throw err;
        console.log(result);
    });


}

