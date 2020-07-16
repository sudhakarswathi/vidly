const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth')
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const {Genere}=require('../models/genere');
const mongoose=require('mongoose');
const {Movie}=require('../models/movie');
const {validating}=require('../models/movie');
 router.get('/',async function(rq,res)
    {
        const movies=await Movie.find();
        res.send(movies);
    })
    router.get('/:id',async function(req,res)
    {
        const movies=await Movie.findById(req.params.id).sort({dailyRent:-1});
        if(!movies)
        {
            return res.status(404).send("The movie is not found with the given Id");
        }
        res.send(movies);
    })
    router.post('/',auth,async function(req,res)
    {
        const movies=validating(req.body)
        if(movies.error)
        {
            return res.status(400).status("Bad request");
        }
        console.log(req.body.generId);
        console.log(req.body);
        const  genere=await Genere.findById(req.body.generId);
        console.log(genere.gener);
        if(!genere)
        {
            return res.status(404).send("Gener not found with the given id");
        }
        let movie=new Movie({
           title:req.body.title,
           gener:{
               _id:genere._id,
               gener:genere.gener
           },
           numberInStock:req.body.numberInStock,
           dailyRent:req.body.dailyRent
    })
    try{
    movie =await movie.save();
    res.send(movie);
    }
    catch(err)
    {
        res.send(err);
    }
    })
    router.put('/:id',auth,async function(req,res)
    {
        const { error } = validating(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
      
        const genre = await Genere.findById(req.body.generId);
        if (!genre) return res.status(400).send('Invalid genre.');
        const movie = await Movie.findByIdAndUpdate(req.params.id,
          { 
            title: req.body.title,
            genre: {
              _id: genre._id,
              name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
          }, { new: true });
      
        if (!movie) return res.status(404).send('The movie with the given ID was not found.');
        
        res.send(movie);

    })
    router.delete('/:id',auth,async function(req,res)
    {
        const movies=await Movie.deleteOne({_id:req.params.id});
   if(!movies)
           return  res.status(404).send("Genere not found with a given id")
    res.send(movies);
    })
   
    module.exports=router;
   