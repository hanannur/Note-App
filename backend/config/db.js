const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()


const connectDB= async function(){
    try{
        await mongoose.connect(process.env.MONGOURI)
        console.log('MongoDB connected successfully')
        
        
    }catch(err){
        console.log('connection error:' , err)

    }
}
module.exports=connectDB