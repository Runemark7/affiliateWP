module.exports = async function(ctx,next){
    if(ctx.session.id != null){
        await next();
    }
    else{
        ctx.body = "FAILURE";
    }

}