module.exports = function(uname,app,coupon_name,con){
    return new Promise(function(resolve, reject){
        app.users.findOne({username : uname}, function(err, result){
            if(err){reject(false); throw err;}
            app.users.updateOne({username : uname}, {$set:{coupon : coupon_name}}, function(err,result){
                if(err){reject(false); throw err;}
                console.log("coupon added to " + uname);
                if(create_coupon(uname, coupon_name,con)){
                    resolve(coupon_name);
                }
            });
        });
    });
}

async function create_coupon(uname,coupon_name_obj,con){
        var c_name = coupon_name_obj.coupon_name;
        var sql = `INSERT INTO wordpress.wp58_posts(post_date, post_date_gmt, post_modified, post_modified_gmt, post_excerpt, to_ping, pinged, post_content_filtered, post_title, post_content, post_status, post_author, post_type)values(NOW(),NOW(),NOW(),NOW(),'${uname}','','','','${c_name}', '', 'publish', '1', 'shop_coupon')`;
        con.query(sql, function(err,result){
            if(err)throw err;
            var coupon_id = result.insertId;
            var sql = `INSERT INTO wordpress.wp58_postmeta(post_id, meta_key, meta_value)values(${coupon_id}, 'discount_type', 'percent')`;
            con.query(sql, function(err,result){
                if(err)throw err;
                });
            var sql = `INSERT INTO wordpress.wp58_postmeta(post_id, meta_key, meta_value)values(${coupon_id}, 'coupon_amount', '10')`;
            con.query(sql, function(err,result){
                if(err)throw err;
                });
            var sql = `INSERT INTO wordpress.wp58_postmeta(post_id, meta_key, meta_value)values(${coupon_id}, 'individual_use', 'no')`;
            con.query(sql, function(err,result){
                if(err)throw err;
                });
            var sql = `INSERT INTO wordpress.wp58_postmeta(post_id, meta_key, meta_value)values(${coupon_id}, 'product_ids', '')`;
            con.query(sql, function(err,result){
                if(err)throw err;
                });
            var sql = `INSERT INTO wordpress.wp58_postmeta(post_id, meta_key, meta_value)values(${coupon_id}, 'exclude_product_ids', '')`;
            con.query(sql, function(err,result){
                if(err)throw err;
                });
            var sql = `INSERT INTO wordpress.wp58_postmeta(post_id, meta_key, meta_value)values(${coupon_id}, 'usage_limit', '')`;
            con.query(sql, function(err,result){
                if(err)throw err;
                });
            var sql = `INSERT INTO wordpress.wp58_postmeta(post_id, meta_key, meta_value)values(${coupon_id}, 'expiry_data', '')`;
            con.query(sql, function(err,result){
                if(err)throw err;
                });
            var sql = `INSERT INTO wordpress.wp58_postmeta(post_id, meta_key, meta_value)values(${coupon_id}, 'apply_before_tax', 'yes')`;con.query(sql, function(err,result){
                if(err)throw err;
                });

            var sql = `INSERT INTO wordpress.wp58_postmeta(post_id, meta_key, meta_value)values(${coupon_id}, 'free_shipping', 'no')`;
            con.query(sql, function(err,result){
                if(err)throw err;
               });
            });
   

    }
