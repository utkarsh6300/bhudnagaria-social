const express=require('express');
const app=express();
const cors= require('cors');

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
 res.json({data:'api runnung'});
});

// app.use('/api/users',require('./routes/api/users'));


const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
});