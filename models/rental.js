const express=require('express');
const router=express.Router();
const {customerSchema}=require('./customer');
const {Customer}=require('./customer');
const {movieSchema}=require('./movie')
const {Movie}=require('./movie');
const mongoose=require('mongoose');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const rentalSchema=new mongoose.Schema({
    customer:{
        type:customerSchema,
        req:true
    },
    movie:{
        type:movieSchema,
        req:true
    },
    dateout:{
        type:Date,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
})
function validating(g)
{
    const schema={
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required(),
        generId:Joi.objectId().required(),
        dateReturned:Joi.date().required(),
        rentalFee:Joi.number().required()
    }
    let result=Joi.validate(g,schema);
    console.log(result);
    return result;
}
const Rental=new mongoose.model('rentals',rentalSchema);
module.exports.rentalSchema=rentalSchema;
module.exports.Rental=Rental;
module.exports.validating=validating;