const mongoose = require('mongoose')
const Notes = require('../models/note')


const getAllNotes= async()=>{
    return await Notes.find()
};

const getNoteById = async(id)=>{
    
    return await Notes.findById(id);
}

const createNotes = async(title , body)=>{
    const newNotes = await Notes.create({
        title , body
    })
    return newNotes;
}

const deleteNotes = async(id)=>{
    
    return await Notes.findByIdAndDelete(id)
}
// const updateNotes = async(id , updatedData)=>{
//     if (!mongoose.Types.Object6Id.isValid(id)) return null;
//     const updatedNotes = await Notes.findByIdAndUpdate(id , updatedData , {
//        new :true,
//        runValidatators:true,
//        context:'query',
//     })
// }
const updatedNote=async(id , updatedData)=>{
    
    const updatedNote=await Notes.findByIdAndUpdate(id , updatedData,{
        new:true,
        runValidators:true,
        context:'query',

    })
    return updatedNote
}


module.exports={
    getAllNotes,
    createNotes,
    getNoteById,
    deleteNotes,
    updatedNote
}