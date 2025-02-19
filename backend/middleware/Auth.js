const jwt = require('jsonwebtoken');

const checkToken = (req,res,next)=>{
    const token = req.headers['tokens'];
    if(!token){
        return res.status(403)
        .json({message:'JWT Token is required'})
    }
    try{
        const verify = jst.verify(token,process.env.JWT_KEY);
        req.user=verify;
    }catch(err){
        return res.status(403)
        .json({message:'JWT Token is invalid or expired'})
    }
}