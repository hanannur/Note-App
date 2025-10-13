const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:{
        type:String ,
        min:3
    } ,
    body:{
        type:String
    }

}
)
module.exports=mongoose.model("Notes", noteSchema);