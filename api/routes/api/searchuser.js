const express=require('express');
const router=express.Router();

const User =require('../../models/User');
const auth=require('../../middlewares/auth');

router.post('/',[auth],
async(req,res)=> {
    const { email}=req.body;
    try {
        let user=await User.findOne({ email });
          
     if(!user) user=await User.findOne({ username:email });
     if(user)
        return  res.json({ id:user.id,name:user.name
    });
    else
        return  res.json({ id:"0",name:'user not available'
    });

        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg:'server error'
        });
    }
});


module.exports=router;
