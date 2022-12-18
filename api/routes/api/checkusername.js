const express=require('express');
const router=express.Router();

const User =require('../../models/User');

router.post('/',[],
async(req,res)=> {
    const { username}=req.body;
    try {
        const user=await User.findOne({ username });
          
     if(user)
        return  res.json({ msg:'user already exists',
    state:false
    });
    else
        return  res.json({ msg:'user available',
    state:true
    });

        
    } catch (error) {
        console.error(err.message);
        res.status(500).json({ msg:'server error',
        state:false
        });
    }
});


module.exports=router;
