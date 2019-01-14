const Router = require('koa-router');
const send = require('koa-send');

const router = new Router();


router.get('/', async function(ctx){
  await send(ctx, 'app/views/login_system/konto.html');
  });


router.get('/login', async function(ctx){
  await send(ctx, 'app/views/login_system/login.html');
  }); 

router.get('/register', async function(ctx){
    await send(ctx, 'app/views/login_system/register.html');
  });

router.post('/register', async function(ctx){

  
});

 module.exports = router