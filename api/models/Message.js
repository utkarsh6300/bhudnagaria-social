const mongoose=require('mongoose');

const MessageSchema =new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    reciever:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'user',
        required:true
    },
    text:{
        type: String,
        required:true
    },
    datetime:{
        type: Date,
        default:Date.now 
    },
    isdeleted:{
        type:Boolean,
        default:false
    }
})


module.exports=Message=mongoose.model('message',MessageSchema);
