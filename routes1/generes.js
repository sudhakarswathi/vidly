const validate=require('../middleware/validateObjectId');
const express=require('express');
const auth=require('../middleware/auth')
const admin=require('../middleware/admin');
var mongoose=require('mongoose');
var Joi=require('joi');
const router=express.Router();
const {Genere}=require('../models/genere');
const {validating}=require('../models/genere');
router.get('/',async function(req,res)
{
    const result=await Genere.find();
    console.log(result);
    res.send(result);
})
router.get('/:id',validate,async function(req,res)
{
    const genere=await Genere.findById(req.params.id);
    if(!genere)
           return  res.status(404).send("Genere not found with a given id")
     res.send(genere);
    
})
router.post('/',auth,async function(req,res)
{
    const result=validating(req.body)
    if(result.error)
    {
        return  res.status(400).send("Inavlid gener name")
    }
    let newgener=new Genere({gener:req.body.gener});
    try{
   newgener=await newgener.save();
   res.send(newgener);
    }
    catch(err)
    {
        console.log(err);
    }

})
router.put('/:id',auth,async function(req,res)
{
    const result=validating(req.body)
    if(result.error)
        return res.status(400).send(result.error.details[0].message)
    let generes=await Genere.update({_id:req.params.id},{
        $set:{
        gener:req.body.gener
    }

    });
       if(!generes)
           return  res.status(404).send("Genere not found with a given id")
    res.send(generes);

}
)
router.delete('/:id',[auth,admin],async function(req,res)
{
   const genere=await Genere.deleteOne({_id:req.params.id});
   if(!genere)
           return  res.status(404).send("Genere not found with a given id")
    res.send(genere);

})
module.exports=router;
