const mongoose=require('mongoose');

const UserSchema =new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique: true
    },
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:{
        type:String,
        default:''
     },
     resetPasswordExpires:{
        type:Date,
        default:Date.now()+3600000
     },
     isVerified:{
        type:Boolean,
        default:false
     },
     connected:{
        type:Array,
        default:[]
    },
    connectionrequest:{
        type:Array,
        default:[]
    },
    sentconnectionrequest:{
        type:Array,
        default:[]
    }
})


module.exports=User=mongoose.model('user',UserSchema);
