const express=require('express');
const router=express.Router()
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const {generScheme}=require('./genere')
const mongoose=require('mongoose');
const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:0,
        maxlength:255
    },
    gener:{
        type:generScheme,
        req:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:25
    },
    dailyRent:{
        type:Number,
        required:true,
        min:0,
        max:255
    }});
    function validating(g)
    {
        const schema={
            title:Joi.string().min(5).required(),
            generId:Joi.objectId().required(),
            numberInStock:Joi.number().required(),
            dailyRent:Joi.number().required()
        }
        let result=Joi.validate(g,schema);
        console.log(result);
        return result;
    }
    const Movie=new mongoose.model('Movies',movieSchema);
    module.exports.movieSchema=movieSchema;
    module.exports.Movie=Movie;
    module.exports.validating=validating;