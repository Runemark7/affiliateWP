module.exports =  function(start,stop,con){
    return new Promise( function(resolve, reject){
        var sql = `SELECT post_id,post_modified,meta_key, meta_value,post_status,post_date FROM wordpress.wp58_woocommerce_order_items
        INNER JOIN wordpress.wp58_postmeta ON wordpress.wp58_woocommerce_order_items.order_id = wordpress.wp58_postmeta.post_id
        INNER JOIN wordpress.wp58_posts ON wordpress.wp58_posts.ID = wordpress.wp58_postmeta.post_id
        WHERE order_item_name="10procentoff" AND meta_key="_order_total" AND post_date between '${start}' AND '${stop}' and post_status="wc-completed"`;
        con.query(sql, function(err,result){
            if(err)reject(err.message);
            resolve(result);
        });
    });
}