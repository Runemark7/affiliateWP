module.exports = async function(ctx,next){
    if(ctx.session.coupon != null){
        console.log("user got coupon");
        await next();
    }
    else{
        ctx.body = "No coupon found, login or create a coupon";
    }
}