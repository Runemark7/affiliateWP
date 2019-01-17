const Router = require('koa-router');
const send = require('koa-send');
const router = new Router();

//modules 
const create_user = require('./../modules/create_user');

router.get('/', async function(ctx){
  await send(ctx, 'app/views/login_system/konto.html');
  });


router.get('/login', async function(ctx){
  await send(ctx, 'app/views/login_system/login.html');
  }); 

router.post('/login', async function(ctx){
  if(login_user(ctx.request.body)){
    ctx.res.send("Du är inloggad");
  };  
});

router.get('/register', async function(ctx){
    await send(ctx, 'app/views/login_system/register.html');
  });

router.post('/register', async function(ctx){
  if(create_user(ctx.request.body)){
    ctx.res.send('Användare registrerad');
  }

});

 module.exports = router