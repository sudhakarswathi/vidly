const express=require('express');
var mongoose=require('mongoose');
var Joi=require('joi');
const router=express.Router();
var generScheme=new mongoose.Schema({
    gener:{type:String,
             required:true,
             minlength:5,
            maxlength:255
         },
    date:{type:Date,default:Date.now}
});
var Genere=new mongoose.model("genere",generScheme);
function validating(g)
{
    const schema={
        gener:Joi.string().min(3).required()
    }
    let result=Joi.validate(g,schema);
    console.log(result);
    return result;
}
module.exports.generScheme=generScheme;
module.exports.Genere=Genere;
module.exports.validating=validating;
