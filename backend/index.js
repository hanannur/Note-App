const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const noteRoute=require('./routes/noteRoute')

const app=express()
app.use(cors())
app.use(express.json())


connectDB();

app.use('/api' , noteRoute);

app.get('/api', (req,res)=>{
    res.send(`${process.env.APPNAME} is running`);
})

const port = process.env.PORT || 3000;

app.listen(port , ()=>{
    console.log(`${process.env.APPNAME ||  ' Application'} is running on port http://localhost:${port}`);
})