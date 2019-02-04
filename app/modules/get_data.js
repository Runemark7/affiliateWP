const mysql = require('mysql');

    var con = mysql.createConnection({
        host: "178.128.194.96",
        user: "runehemma",
        password: 'lennartgillar'
    }); 

module.exports =  function(coupon){
    return new Promise( function(resolve, reject){
            con.connect( function(err){if(err)throw err;});
            var sql = `SELECT post_id,post_modified,meta_key, meta_value,post_status FROM wordpress.wp58_woocommerce_order_items
            INNER JOIN wordpress.wp58_postmeta ON wordpress.wp58_woocommerce_order_items.order_id = wordpress.wp58_postmeta.post_id
            INNER JOIN wordpress.wp58_posts ON wordpress.wp58_posts.ID = wordpress.wp58_postmeta.post_id
            WHERE order_item_name="10procentoff" AND meta_key="_order_total"`;
            con.query(sql, function(err,result){
                if(err)reject(err.message);
                resolve(result);
                con.end();
            });
    });
}