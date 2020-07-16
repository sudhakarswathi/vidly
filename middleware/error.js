const winston=require('winston');
module.exports=function(err,req,res,next)
{
    winston.log('error',err.message);
    //error
    //warning
    //info
    //debug
    res.status(500).send(err.message);

}