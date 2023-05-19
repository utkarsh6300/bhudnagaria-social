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
app.use('/api/getusername',require('./routes/api/getusername'));
app.use('/api/connecteduser',require('./routes/api/connecteduser'));
app.use('/api/connectionrequest',require('./routes/api/connectionrequest'));
app.use('/api/message',require('./routes/api/message'));
app.use('/api/searchuser',require('./routes/api/searchuser'));
app.use('/api/authenticate',require('./middlewares/verify_token'));

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
}); 