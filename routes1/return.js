const express=require('express');
const {Rental}=require('../models/rental')
const auth=require('../middleware/auth');
const router=express.Router();
router.get('/:id/fee',auth,async function(req,res)
{
        const rental=await Rental.findById(req.params.id);
        if(!rental)
            return res.status(404).send("rental not found with the given id");
        const fee=rental.movie.numberInStock*rental.rentalFee;
        const rental1 = await Rental.updateOne({_id:req.params.id},
            {$set: {
             rentalFee:0

            }
             }, );
    if(rental.rentalFee==0)
    {
    const rentals=await Rental.deleteOne({_id:req.params.id});
   if(!rentals)
           return  res.status(404).send("Genere not found with a given id")
    res.send("Rental was removed as you paid the fee")
    }
})
module.exports=router;