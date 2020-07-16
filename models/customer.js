const express=require('express');
const mongoose=require('mongoose');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:25,
        required:true
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phonenumber:{
        type:String,
        minlength:5,
        maxlength:20,
        required:true
    }
});
function validating(g)
{
    const schema={
        name:Joi.string().min(5).required(),
        isGold:Joi.boolean(),
        phonenumber:Joi.string().min(5).required()
    }
    let result=Joi.validate(g,schema);
    console.log(result);
    return result;
}
const Customer=new mongoose.model("Customers",customerSchema);
module.exports.customerSchema=customerSchema;
module.exports.Customer=Customer;
module.exports.validating=validating;