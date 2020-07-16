const winston=require('winston');
//require('winston-mongodb');
module.exports=function()
{
process.on('uncaughtException',(err)=>
{
    console.log("UNCAUGHT EXCEPTION CAUGHT OUT OF THE ROUTER");
    console.log(err.message);
    winston.error(err,err.message);
    process.exit(1);
})
process.on('unhandledRejection',(err)=>
{
    console.log("Some promises were not handled");
    console.log(err.message);
    winston.error(err,err.message);
    process.exit(1)
})
winston.add(winston.transports.File,{
    filename:'logfile.log'
});
// const p=Promise.reject(new Error("Hi i am an mongo error"))
// p.then(console.log("WellDone"));
// throw new Error("Hello error");
// winston.add(winston.transports.MongoDB,{db:'mongodb://localhost:27017/generes'})
}
