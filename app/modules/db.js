const mongoose = require('mongoose');
module.exports = function(app){
    mongoose.connect('mongodb://localhost:27017/affWP', {useNewUrlParser: true}, function(err,con){
        if(err)throw err;
        console.log("mongoose Connected!");
        app.users = con.db.collection("users");
    });
}