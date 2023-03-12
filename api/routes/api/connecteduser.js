const express=require('express');
const router=express.Router();
const User=require('../../models/User');
const auth = require('../../middlewares/auth');


router.get('/',[auth],async(req,res)=>{
    try{
    //   if(req.body.id!=req.user.id) return  res.status(500).send('server error');
  let data= await User.findById(req.user.id).select("connected");
  // console.log(data);
  res.json(data.connected);
}
  catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});
router.get('/requests',[auth],async(req,res)=>{
    try{
    //   if(req.body.id!=req.user.id) return  res.status(500).send('server error');
  let data= await User.findById(req.user.id).select("connectionrequest");
    // let responsedata=[];
//    await data.connectionrequest.forEach(async(data2)=>{
//       try {
        
//         let res1= await User.findById(data2).select("name");
//         let name=res1.name
//         // console.log({id:data2,name:name.name});
//         responsedata=[...responsedata,{id:data2,name:name}];
//       } catch (error) { 
//         console.error(error);
//       }
// });
//  await console.log(responsedata); 
  // search each id add its name and send response
  // console.log(data);
  res.json(data);
}
  catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});



module.exports=router;

  