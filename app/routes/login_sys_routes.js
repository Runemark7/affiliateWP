const Koa = require('koa');
const Router = require('koa-router');
const send = require('koa-send');
const session = require('koa-session');
const auth = require("./../middleware/check_session");
const router = new Router();

//modules 
const create_user = require('./../modules/create_user');
const login_user = require('./../modules/login_user');


router.get('/',auth,async function(ctx){
  await send(ctx, 'app/views/login_system/konto.html');

  });


router.get('/login',async function(ctx){
  await send(ctx, 'app/views/login_system/login.html');
  }); 

router.post('/login', async function(ctx){
 let loginCheck = await login_user(ctx.request.body);
  if(loginCheck)
  {
    ctx.session.id = loginCheck._id;
    console.log("you are logged in from route");
  }
  else{
    console.log("you failed from route");
  }
});

router.get('/register', async function(ctx){
    await send(ctx, 'app/views/login_system/register.html');
  });

router.post('/register', async function(ctx){
  if(create_user(ctx.request.body)){
    ctx.res.send('Användare registrerad');
  }
});

router.get('/logout', async function(ctx){
  ctx.session = null;
  console.log(ctx.session);
  ctx.body = "Du är utloggad";
});


 module.exports = router