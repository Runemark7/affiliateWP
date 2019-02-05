//instrallerade paket !(koa-ejs)
const Koa = require('koa');
const Router = require('koa-router');
const session = require("koa-session");
const parser = require('koa-bodyparser');
const static = require('koa-static');
const render = require('koa-ejs');
const path = require('path');
const Chart = require('chart.js');
const app = new Koa();
const router = new Router();

//MIDDLEWARE
const auth = require("./app/middleware/check_session");
const coupon = require("./app/middleware/check_coupon");

////////////////////////////////////////CONFIGS/////////////////////////////////////////
const CONFIG = {
  key: 'koa:sess',
    maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

render(app,{
  root: path.join(__dirname, 'app', 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
});

app.keys = ['patrikgillarintedig'];

app.use(session(CONFIG,app));  // Include the session middleware
app.use(static('public'));

//standard 

app.use(parser());
app.use(router.routes());
app.use(router.allowedMethods());

require('./app/modules/db.js')(app);

//#########################################################################
//##########################STANDARD ROUTES################################
//#########################################################################

const get_data = require('./app/modules/get_data');

router.get('/',coupon,async function(ctx){
  var coupon_name = ctx.session.coupon;
  let get_info = await get_data(coupon_name);

  var numbers = [];
  get_info.forEach(res=>{
    numbers.push(parseInt(res.meta_value));
  });
  var sum = numbers.reduce(function(total,num){
    return total + Math.round(num);
  });
  var id = ctx.session.id;
  await ctx.render('template',{"userid" : id,"total_sale": sum, "order_info": get_info});
});

//#########################################################################
//############################LOGIN ROUTES#################################
//#########################################################################

const create_user = require('./app/modules/create_user');
const login_user = require('./app/modules/login_user');
const add_coupon = require('./app/modules/add_coupon');

router.get('/konto',auth,async function(ctx){
  await ctx.render('login_system/konto');
});

router.get('/konto/login',async function(ctx){
  await ctx.render('login_system/login');  
}); 

router.post('/konto/login', async function(ctx){
 let loginCheck = await login_user(ctx.request.body);
  if(loginCheck)
  {
    console.log(loginCheck);
    if(loginCheck.coupon.coupon_name != null)
    {
      ctx.session.coupon = loginCheck.coupon.coupon_name;
    }
    else{
      console.log("user dont got a coupon");
    }

    ctx.session.username = ctx.request.body.username;
    ctx.session.id = loginCheck._id;
    console.log("you are logged in from route");
  }
  else{
    console.log("you failed from route");
  }
});

router.get('/konto/register', async function(ctx){
    await ctx.render('login_system/register');
});

router.post('/konto/register', async function(ctx){
  if(create_user(ctx.request.body)){
    ctx.body = "användare skapad";
  }
  else{
    ctx.body = "Fel";
  }
});

router.get('/konto/logout', async function(ctx){
  ctx.session = null;
  ctx.body = "Du är utloggad";
});

router.get('/konto/rabattkod', async function(ctx){
  await ctx.render('includes/insert_coupon');
});

router.post('/konto/rabattkod', async function(ctx){
  var username = ctx.session.username;
  if(add_coupon(username,app,ctx.request.body))
  {
    ctx.body = "coupon added";
  }
  else
  {
    ctx.body = "coupon failed, test again";
  }
});

app.listen(3000, console.log("3000"));