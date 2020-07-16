const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth')
const {customerSchema}=require('../models/customer');
const {Customer}=require('../models/customer')
const {movieSchema}=require('../models/movie')
const {Movie}=require('../models/movie');
const mongoose=require('mongoose');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const { Genere } = require('../models/genere');
const {Rental}=require('../models/rental');
const {rentalSchema}=require('../models/rental');
const {validating}=require('../models/rental');
router.get('/',async function(req,res)
{
    const rentals=await Rental.find();
    res.send(rentals);
  })
router.post('/',auth,async function(req,res)
{
    const rentals=validating(req.body)
        if(rentals.error)
        {
            return res.status(400).status(rentals.error.message[0]);
        }
        const customer=await Customer.findById(req.body.customerId);
        if(!customer)
        {
            return res.status(404).send("Customer not found with given id");
        }
        const  movie=await Movie.findById(req.body.movieId);
        if(!movie)
        {
            return res.status(404).send("Gener not found with the given id");
        }
        const genere=await Genere.findById(req.body.generId);
        if(!genere)
        {
            return res.status(404).send("Genere not found with given id ");
        }
        let rental=new Rental({
            customer:{
                _id:customer._id,
                name:customer.name,
                isGold:customer.isGold,
                phonenumber:customer.phonenumber
            },
            movie:{
            _id:movie._id,
           title:movie.title,
           gener:{
               _id:genere._id,
               gener:genere.gener
           },
           numberInStock:movie.numberInStock,
           dailyRent:movie.dailyRent
        },
        dateReturned:req.body.dateReturned,
        rentalFee:req.body.rentalFee
    })
    try{
    rental =await rental.save();
    res.send(rental);
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
      
        const genere = await Genere.findById(req.body.generId);
        if (!genere) return res.status(400).send('Invalid genre.');
        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send('Invalid movie.');
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).send('Invalid customer.');
        const rental = await Rental.findByIdAndUpdate(req.params.id,
          { 
            customer:{
                _id:customer._id,
                name:customer.name,
                isGold:customer.isGold,
                phonenumber:customer.phonenumber
            },
            movie:{
            _id:movie._id,
           title:movie.title,
           gener:{
               _id:genere._id,
               gener:genere.gener
           },
           numberInStock:movie.numberInStock,
           dailyRent:movie.dailyRent
        },
        dateReturned:req.body.dateReturned,
        rentalFee:req.body.rentalFee  
    }, { new: true });
    if (!rental) return res.status(404).send('The movie with the given ID was not found.');
        
        res.send(rental);

    })
    router.get("/:id",async function(req,res)
    {
        console.log(req.params.id);
        const rental=await Rental.findById(req.params.id);
        if(!rental)
        return res.status(404).send("Rental not found");
        res.send(rental);
    })
    router.delete('/:id',auth,async function(req,res)
    {
        const rentals=await Rental.deleteOne({_id:req.params.id});
   if(!rentals)
           return  res.status(404).send("Genere not found with a given id")
    res.send(rentals);
    })

module.exports=router;
