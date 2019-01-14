//instrallerade paket !(koa-ejs)
const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const send = require('koa-send');
const path = require("path");
const parser = require('koa-bodyparser');
//separata routes
const login_system_routes = require('./app/routes/login_sys_routes');

//moduler


const app = new Koa();
const router = new Router();

//routes 
router.use('/konto', login_system_routes.routes());

//standard 
app.use(parser());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/', async function(ctx){

  await send(ctx, 'public/index.html');
  
});

app.listen(3000);
