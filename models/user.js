const mongoose=require('mongoose')
const config=require('config');
const jwt=require('jsonwebtoken');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:25
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:30
    },
    password:
    {
        type:String,
        required:true,
        minlength:4,
        maxlength:255
    },
    isAdmin:
{
    type:Boolean
}});
userSchema.methods.generateAuthToken=function()
    {
        console.log(this.isAdmin);
        const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('SwathisApi'));
        return token;
    };
const Users=new mongoose.model("users",userSchema);

function validating(g)
{
    const schema={
        name:Joi.string().min(5).required(),
        email:Joi.string().min(5).required().email(),
        password:Joi.string().min(4).required(),
        isAdmin:Joi.boolean()
    }
    let result=Joi.validate(g,schema);
    console.log(result);
    return result;
}
module.exports.Users=Users;
module.exports.validating=validating;