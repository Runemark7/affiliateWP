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
            console.log("mysql Connected!");
            var sql = `SELECT * FROM wordpress.wp58_woocommerce_order_items WHERE order_item_name='10procentoff'`;
            con.query(sql, function(err,result){
                if(err)reject(err.message);
                
                var order_ids = [];

                result.forEach(element => {
                    order_ids.push(element.order_id); 
                });

                order_ids.forEach(id => {
                    var sql_order = `SELECT * FROM wordpress.wp58_postmeta where post_id=${id} and meta_key='_order_total'`;
                    con.query(sql_order, function(err,result,fields){
                        if(err)throw err;
                        resolve(result);
                    });
                });
            });
        });
    });
}

  /*              var order_data = [];
                    order_ids.forEach(async function(id) {
                        var sql = `SELECT * FROM wordpress.wp58_postmeta where post_id=${id}`;
                        await con.query(sql, function(err,result){
                            if(err)throw err;
                            return order_data.push(result);
                        });
                    });
                console.log(order_data);
                resolve(order_data);
    */            
                      /*  order_ids.forEach(element => {
                        var sql = `SELECT * FROM wordpress.wp58_postmeta where post_id='${element}' AND meta_key="_order_total"`;
                        con.query(sql, function(err,result){
                            if(err)reject(err.message);
                            return result;
                        }); 
                    });*/
                   // var sql = `SELECT * FROM wordpress.wp58_postmeta where post_id=${order_id}`;
                     //   con.query(sql, function(err,result){
                       //     if(err)throw err;
                         //   console.log(result);
                   //     });
                /*  
                    1. Hämta datan klar
                    2. SELECT * FROM wordpress.wp58_postmeta where post_id=alla ordrars idn; klar
                    3. Kolla om ordern är pending eller success 
                    4. Pending = orange/gul success = grön och utgå ifrån de värderna
                */