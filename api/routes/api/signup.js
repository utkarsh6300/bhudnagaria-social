const express=require('express');
const router=express.Router();


const { check ,validationResult}=require('express-validator');
const config=require('config');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const User =require('../../models/User');



router.post('/',[
    check('username','username required')
.not()
.isEmpty(),
    check('name','name required')
     .not()
     .isEmpty(),
    check('email','invalid email').isEmail(),
    check('password','minmum length of password is 6 character').isLength({ min:5})
  
],
async(req,res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array()})
    }
    const { username,name, email, password }=req.body;

    try{
 
    // see if user exists
   let user=await User.findOne({ email });
   let user1=await User.findOne({ username });
    
    if(user||user1){
    return  res.status(400).json({errors:[{ msg:'user already exists' }]});
    }
 
 
   
    user=new User({
     username,
      name,
      email,
      password
    });
    //encrypt password
      const salt=await bcrypt.genSalt(10);
 
      user.password=await bcrypt.hash(password,salt);
 
      await user.save();
    
    //return jsonwebtoken
 
 const payload={
   user:{
     id:user.id
   }
 }
 
const token = await jwt.sign(payload, process.env.JWTSECRET ||config.get('jwtSecret'), { expiresIn:3600000 } );

     await res.json({token,id:user.id});
 
    }
    catch(err){
        console.error(err); 
        console.error(err.message);
        res.status(500).send('server error');
      }
 
 
 });
 
 module.exports=router;