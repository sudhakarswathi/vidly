const express=require('express');
var router=express.Router();
router.get('/',function(req,res)
{
    res.send("Welcome to view the geners of the movies");
})
module.exports=router;