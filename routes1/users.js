const express=require('express');
const auth=require('../middleware/auth')
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const Joi=require('joi');
const _=require('lodash');
const config=require('config');
const jwt=require('jsonwebtoken');
const { eachRight } = require('lodash');
const {userSchema}=require('../models/user');
const {Users}=require('../models/user');
const {validating}=require('../models/user');
Joi.objectId=require('joi-objectid')(Joi);
if(!config.get('SwathisApi'))
{
    console.error("FATAL ERROR: Jwt private key not set")
    process.exit(1);
}
router.get('/me',auth,async function(req,res)
{
   const user=await  Users.findById(req.user._id).select('-password');
   res.send(user);
}
);
router.post('/',async function(req,res)
{
    console.log("post");
    var user=validating(req.body);
    if(user.error)
    {
        console.log(user.error);
        return res.status(400).send(user.error);
    }
    var email=await Users.findOne({email:req.body.email});
    if(email)
    {
        return res.status(400).send(" User already registered");
    }
    let users=new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        isAdmin:req.body.isAdmin
    });
    const salt=await bcrypt.genSalt(10);
    users.password=await bcrypt.hash(req.body.password,salt);
    users=await users.save(); 
    const token=users.generateAuthToken();
    res.header('X-auth-token',token).send(_.pick(users,['name','email']));
})
module.exports=router;
