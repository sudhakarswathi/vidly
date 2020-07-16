require('express-async-errors');
var express=require('express')
// process.on('uncaughtException',(err)=>
// {
//     console.log("UNCAUGHT EXCEPTION CAUGHT OUT OF THE ROUTER");
//     console.log(err.message);
//     winston.error(err,err.message);
//     process.exit(1);
// })
// process.on('unhandledRejection',(err)=>
// {
//     console.log("Some promises were not handled");
//     console.log(err.message);
//     winston.error(err,err.message);
//     process.exit(1)
// })
const app=express();
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/prod')(app);
const port=process.env.PORT||3000
const server=app.listen(port);
console.log(`Listening to port ${port}`)
module.exports=server;