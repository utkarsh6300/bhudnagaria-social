const express=require('express');
const Message=require('../../models/Message');
const router=express.Router();
const auth = require('../../middlewares/auth');


router.post('/add',[auth],async(req,res)=>{
    try{
        if(!(req.body.sender||req.body.reciever||req.body.text)) res.status(500).send("empty fields");
   const message=new Message({"sender":req.body.sender,"reciever":req.body.reciever,"text":req.body.text});
  let data= await message.save();
//   console.log(data);
  res.json({msg:"savedmessage"});
}
  catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  } 
}); 
router.post('/get',[auth],async(req,res)=>{
    try{
        if(!(req.body.sender||req.body.reciever)) res.status(500).send("empty fields");
   const message=await Message.find({"sender":{$in:[req.body.sender,req.body.reciever]},"reciever":{$in:[req.body.sender,req.body.reciever]},isdeleted:false});
//   console.log(message);
  res.json({msg:message});
}
  catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
}); 



module.exports=router;

  
