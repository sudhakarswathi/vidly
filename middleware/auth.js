const  jwt = require("jsonwebtoken");
var config=require('config');
function auth(req,res,next)
{
    const token=req.header('X-auth-token');
    if(!token)  return  res.status(401).send("Acess denied . No token provided");
    try{
    const decoded=jwt.verify(token,config.get('SwathisApi'));
    req.user=decoded;
    next();
    }
    catch(err){
        res.status(400).send("Invalid token.");
    }
    
}
module.exports=auth;