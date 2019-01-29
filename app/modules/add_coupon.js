module.exports = function(uname,app,coupon_name){
    return new Promise(function(resolve, reject){
        app.users.findOne({username : uname}, function(err, result){
            if(err){reject(false); throw err;}
            app.users.updateOne({username : uname}, {$set:{coupon : coupon_name}}, function(err,result){
                if(err){reject(false); throw err;}
                console.log("coupon added to " + uname);
                resolve(true);
            });
        });
    });
}

