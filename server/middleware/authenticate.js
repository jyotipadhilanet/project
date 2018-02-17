var authenticate=(req,res,next)=>{
    if(token=="")
    {
        res.json('plz login first')
    }
    else
    {
        next();
    }
}

module.exports=authenticate;