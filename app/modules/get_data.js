const mysql = require('mysql');

    var con = mysql.createConnection({
        host: "178.128.194.96",
        user: "runehemma",
        password: 'lennartgillar'
    }); 

module.exports =  function(coupon){
    return new Promise(function(resolve, reject){
        con.connect( function(err) {
            if (err) throw err;
            var sql = `SELECT * FROM wordpress.wp58_woocommerce_order_items WHERE order_item_name='${coupon}'`;
            con.query(sql, async function(err,result){
                if(err)reject(err.message);
                order_ids = [];
                result.forEach(element => {
                    order_ids.push(element.order_id);
                });

                order_ids.forEach(id=>{
                    var sql_order = `SELECT * FROM wordpress.wp58_postmeta where post_id in (?)`;
                    con.query(sql_order, [order_ids] , function(err,result){
                        if(err)throw err;
                        console.log("huhe");
                        console.log(result._paid_date);
                        resolve();
                    });
                });
            });
        });
    });
}
                /* 
                    1. Hämta datan klar
                    2. SELECT * FROM wordpress.wp58_postmeta where post_id=alla ordrars idn; klar
                    3. Kolla om ordern är pending eller success 
                    4. Pending = orange/gul success = grön och utgå ifrån de värderna
                */