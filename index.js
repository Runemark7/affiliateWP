//instrallerade paket !(koa-ejs)
const Koa = require('koa');
const Router = require('koa-router');
const session = require("koa-session");
const parser = require('koa-bodyparser');
const mongoose = require('mongoose');
const static = require('koa-static');
const render = require('koa-ejs');
const path = require('path');
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

app.keys = [process.env.test];

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

app.listen(3000, console.log("3000"));
