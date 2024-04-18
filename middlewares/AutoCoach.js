const JWT=require('jsonwebtoken')
const AutoCoach=async(req,res,next)=>{

try {
    const token=req.headers.token
    if(!token){
    res.status(400).json({msg:"you are not autorised"})}
else
{
    const verifiedToken =await JWT.verify(token,process.env.JWT_secret);

    if(!verifiedToken )
    {
        res.status(400).json({msg:"you are not autorised"});

    }
    else{

        req.body.Coachid = verifiedToken.id;
next()
    }
}
} catch (error) {
    res.status(500).json({msg:"error",error:error}) 

}

}
module.exports=AutoCoach