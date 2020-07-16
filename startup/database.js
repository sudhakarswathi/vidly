var mongoose=require('mongoose');
const config=require('config')
module.exports=function()
{
    mongoose.connect(config.get('db'))
    .then(()=>console.log('connected to the',config.get('db') ))
    .catch((err)=>console.log(err));
}