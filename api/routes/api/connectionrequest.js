const express=require('express');
const router=express.Router();
const User=require('../../models/User');
const auth = require('../../middlewares/auth');


router.post('/send',[auth],async(req,res)=>{
    try{
   
    // console.log(req.body.connectionid)
    if(!req.body.connectionid) 
    res.status(500).send('no id to connect');
  await User.findByIdAndUpdate(req.user.id,{$addToSet :{sentconnectionrequest:req.body.connectionid}});
  await User.findByIdAndUpdate(req.body.connectionid,{$addToSet :{connectionrequest:req.user.id}});
  // res.status(200).json(res1);
  res.json({msg:"sent request"});
}
catch(err){
  console.error(err.message);
  res.status(500).send('server error');
}
});
router.post('/accept',[auth],async(req,res)=>{
  try{ 
    // req.body.connectionid=Number(req.body.connectionid);
    // const connectionid= req.body.connectionid; 
    // const user= await User.findById(connectionid).select('name');
    // console.log(user);
    if(!req.body.connectionid)  
    res.status(500).send('no id to connect');
    await User.findByIdAndUpdate(req.user.id,
    {  $addToSet :{connected:req.body.connectionid}
    // ,   $pop:{connectionrequest:req.body.connectionid}
    },{connectionrequest:req.body.connectionid});
    await User.findByIdAndUpdate(req.body.connectionid,
      {$addToSet :{connected:req.user.id}
      // ,$pop:{connectionrequest:req.user.id}
    }
    ,
    {sentconnectionrequest:req.user.id}
    );
    // res.status(200).json(res1);
    res.json({msg:"accepted request"});
  
}
catch(err){ 
    console.error(err.message);
    res.status(500).send('server error');
  }
});



module.exports=router;

  