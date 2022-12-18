const express=require('express');
const app=express();
const cors= require('cors');

app.use(express.json());
app.use(cors());

// database
const connectDB=require('./config/db');

//connect database
connectDB();

app.get('/',(req,res)=>{
 res.json({data:'api runnung'});
});

app.use('/api/signup',require('./routes/api/signup'));
app.use('/api/login',require('./routes/api/login'));
app.use('/api/checkusername',require('./routes/api/checkusername'));


const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
});