const express=require('express');
const config=require('config');
const auth=require('../middleware/auth')
const router=express.Router();
const {Users}=require('../models/user');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const Joi=require('joi');
const _=require('lodash');
const jwt=require('jsonwebtoken');
Joi.objectId=require('joi-objectid')(Joi);
if(!config.get('SwathisApi'))
{
    console.error("FATAL ERROR: Jwt secretkey not defined")
    process.exit(1);
}
router.post('/',auth,async function(req,res)
{
    var user=validating(req.body);
    if(user.error)
    {
        return res.status(400).send(user.error);
    }
    var email=await Users.findOne({email:req.body.email});
    if(!email)
    {
        return res.status(400).send(" Invalid email or password");
    }
    const password=await bcrypt.compare(req.body.password,email.password);
    if(!password) return  res.status(400).send(" Invalid email or password");
    const token=jwt.sign({_id:email._id},config.get('SwathisApi'));
    res.send(token);
   })
function validating(g)
{
    const schema={
        email:Joi.string().min(5).required().email(),
        password:Joi.string().min(4).required()
    }
    let result=Joi.validate(g,schema);
    console.log(result);
    return result;
}
module.exports=router;