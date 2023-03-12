const express=require('express');
const router=express.Router();

const User =require('../../models/User');
const auth = require('../../middlewares/auth');

router.post('/',[auth],
async(req,res)=> {
    const {id}=req.body;
    try {
        const user=await User.findById(id).select('username');
  return res.status(200).json(user.username);

    }
     catch (error) {
        console.error(error.message);
        res.status(500).json({ msg:'server error'
        });
    }
});


module.exports=router;
