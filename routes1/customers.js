const express=require('express');
const auth=require('../middleware/auth')
const Router=express.Router();
const mongoose=require('mongoose');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const {customerSchema}=require('../models/customer');
const {Customer}=require('../models/customer');
const {validating}=require('../models/customer');
Router.get('/',async function(req,res)
{   
    const cust=await Customer.find();
    res.send(cust);
});
Router.get("/:id",async function(req,res)
{
    const cust = await Customer.findById(req.params.id);
    if(!cust)
    {
        return res.status(404).send('Customer is not found by the given ID');
    }
    res.send(cust);
});
Router.post('/',auth,async function(req,res)
{
    var customer=Joi.validate(req.params.body);
    if(customer.error)
        return res.status(400).send(customer.error.messages[0]);
    let cust=new Customer({
        name:req.body.name,
        isGold:req.body.isGold,
        phonenumber:req.body.phonenumber
    });
    cust=await cust.save();
    res.send(cust);

})
Router.put('/:id',auth,async function(req,res){
    const result=validating(req.body)
    if(result.error)
        return res.status(400).send(result.error.details[0].message)
    let customer=await Customer.update({_id:req.params.id},{
        $set:{
        name:req.body.name,
        isGold:req.body.isGold,
        phonenumber:req.body.phonenumber
    }

    });
       if(!customer)
           return  res.status(404).send("Genere not found with a given id")
    res.send(customer);
})
Router.delete('/:id',auth,async function(req,res)
{
    const customer=await Customer.deleteOne({_id:req.params.id});
   if(!customer)
           return  res.status(404).send("Genere not found with a given id")
    res.send(customer);
})
module.exports=Router;
