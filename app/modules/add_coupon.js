const insert_coupon = require('./../schemas/add_coupon_schema');
const mongoose = require('mongoose');

module.exports = async function(user_id){
    return new Promise(function(resolve, reject){
        insert_coupon.findOne({ _id: user_id}, function(err,result){
            if(err){
                reject(err);
            }
            else{
                var objResult = result.toObject();
                console.log(objResult);
            }
        });
    });
}