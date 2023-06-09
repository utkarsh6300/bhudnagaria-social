const express=require('express');
const router=express.Router();
const User=require('../../models/User');


const { oneOf,check ,validationResult}=require('express-validator');
const config=require('config');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


router.post('/',[
    oneOf( 
    [
      check('email','invalid email').exists().isEmail(),
      check('username','usename required').exists().not().isEmpty(),
    ],
  ),
      // check('email','invalid email').isEmail(),
      check('password','password is required').exists()
    ],
  async(req,res)=> {
  
     const errors=validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({ errors:errors.array()})
     }
  
     const { username,email, password }=req.body;
  
     try{
   let user;
     // see if user exists
     user=await User.findOne({ email });
     if(!user)
      user=await User.findOne({ username });
  
     
     if(!user){
     return  res.status(400).json({errors:[{ msg:'user does not exists' }]});
     }
  
   
   const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
      return  res.status(400).json({errors:[{ msg:'incorrect password' }]});
    }
     
     //return jsonwebtoken
      
  
  const payload={
    user:{
      id:user.id
    }
  }
  
  const token = await jwt.sign(payload,     config.get('jwtSecret'),    { expiresIn:3600000 } );

     await res.json({token,id:user.id});

  
  
     }
       catch(err){
           console.error(err);
         console.error(err.message);
         res.status(500).send('server error');
       }
  
    
  
  });
  
  module.exports=router;