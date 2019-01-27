//instrallerade paket !(koa-ejs)
const Koa = require('koa');
const Router = require('koa-router');
const session = require("koa-session");
const parser = require('koa-bodyparser');
const mongoose = require('mongoose');
const static = require('koa-static');
const render = require('koa-ejs');
const path = require('path');
const mysql = require('mysql');
const app = new Koa();
const router = new Router();
const auth = require("./app/middleware/check_session");

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

// ejs settings 
render(app,{
  root: path.join(__dirname, 'app', 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: false
});

app.keys = ['patrikgillarintedig'];

app.use(session(CONFIG,app));  // Include the session middleware
app.use(static('public'));


//modules
mongoose.connect('mongodb://localhost:27017/affWP', {useNewUrlParser: true});

//routes
const login_system_routes = require('./app/routes/login_sys_routes');
router.use('/konto', login_system_routes.routes());

//standard 
app.use(parser());
app.use(router.routes());
app.use(router.allowedMethods());


router.get('/',async function(ctx){
  var id = ctx.session.id;
  await ctx.render('template',{"userid" :id });
});

/* 

NÄR MAN SKAPAR EN KOD SKA DEN LÄGGAS I USERNS "info" COLUMN SÅ ATT MAN SEDAN KAN GÖRA EN QUERY PÅ JUST DEN ANVÄNDARENS ID OCH HÄMTA DEN NÄR
MAN SKA SPEGLA STATISIKEN PÅ STARTSIDAB


infon om koden 
SELECT * FROM wordpress.wp58_woocommerce_order_itemmeta where order_item_id=31;
hur mycket det är som personen tjänat:
om koden är ex. 10% off kan man egentligen bara räkna ut hur mycket startpriset är med summan/procent = startsumman(om det är summan efter eller före rabattkoden får jag bestämma)

hitta om orderna använder sig av en kod
SELECT * FROM wordpress.wp58_woocommerce_order_items;
          (order-id)
för att se ifall den order är pga influencern tex ifall de verkligen har använt en viss kod
SELECT * FROM wordpress.wp58_woocommerce_order_items WHERE order_item_type="coupon";
sedan tar man order_item_id och gör en query till SELECT * FROM wordpress.wp58_woocommerce_order_itemmeta where order_item_id=31; och där kan man se discount_amount
*/

var con = mysql.createConnection({
  host: "178.128.194.96",
  user: "runehemma",
  password: "lennartgillar"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  get_the_id();
});

function get_the_id(){
  var sql = "SELECT * FROM wordpress.wp58_posts WHERE post_type='shop_coupon'";
  con.query(sql, function(err,result){
  if(err)throw err;
    var get_id = JSON.parse(JSON.stringify(result));
    var the_id = 0;
    get_id.forEach(element => {
      the_id = element.ID;
    });
    get_the_count(the_id);
});
}

function get_the_count(id){
  var sent_id = id;
  var sql = `SELECT * FROM wordpress.wp58_postmeta WHERE post_id=${sent_id} AND meta_key='usage_count'`;
  con.query(sql, function(err,result){
  if(err)throw err;
  var result_info = JSON.parse(JSON.stringify(result));
  result_info.forEach(element => {
    console.log(element);
  });
});
}

 
app.listen(3000, console.log("3000"));
