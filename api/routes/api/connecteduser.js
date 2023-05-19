const express=require('express');
const router=express.Router();
const User=require('../../models/User');
const auth = require('../../middlewares/auth');


var mongoose = require('mongoose');

router.get('/',[auth],async(req,res)=>{
    try{
    //   if(req.body.id!=req.user.id) return  res.status(500).send('server error');
  let data= await User.findById(req.user.id).select("connected");
  let responsedata = [];

  for (const data2 of data.connected) {
    try {
      let data3 = mongoose.Types.ObjectId(data2);
      let res1 = await User.findById(data3).select("name");
      // console.log(res1);
      responsedata.push(res1);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(responsedata);
  res.json(responsedata);
  // console.log(data);
  // res.json(data.connected);
}
  catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});
router.get('/requests', [auth], async (req, res) => {
  try {
    let data = await User.findById(req.user.id).select("connectionrequest");
    let responsedata = [];

    for (const data2 of data.connectionrequest) {
      try {
        let data3 = mongoose.Types.ObjectId(data2);
        let res1 = await User.findById(data3).select("name");
        // console.log(res1);
        responsedata.push(res1);
      } catch (error) {
        console.error(error);
      }
    }

    console.log(responsedata);
    res.json(responsedata);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});




module.exports=router;

  