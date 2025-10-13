const noteService= require('../services/noteservice')

const  getAll = async(req , res)=>{
    try{
        const Notes = await noteService.getAllNotes();
        res.json({status:"success", data:Notes ||[]})
    }catch(error){
        res.status(500).json({status:"error" , message:error.message })

    }
}

const getOne= async(req,res)=>{
    try{
        const id= req.params.id;
        const oneNote = await noteService.getNoteById(id);
        res.json({status:"success" , data:oneNote})

    }catch(error){
        res.status(404).json({status:"error" , message:"error.message"})
    }
}

const create= async(req,res)=>{
    try{
        const{title , body}=req.body;
        const newNotes= await noteService.createNotes(title, body)
        return res.status(200).json({status:"success", mesaage:"Created Sucessfully" , data:newNotes})

    }catch(error){
        res.status(500).json({status:"error" , message:error.message})
        console.log({message:error.message})
    }
}

const remove = async(req,res)=>{
    try{
    const id = req.params.id;
    const removedNote=await noteService.deleteNotes(id);
    if(!removedNote){
        res.status(404).json({message:"Book is not found"})
    }
    return res.status(201).json({status:"sucsess", message:"Note is deleted Sucessfully"})
}catch(error){
    return res.status(400).json({status:"error", message:error.message})
}

}

const updatedNotes=async(req, res)=>{
    try{
        const id = req.params.id;
        const updatedData=req.body;
        const updatedNote = await noteService.updatedNote(id, updatedData);
        if(!updatedNote){
            return res.status(404).json({message:"Note is not found"})
        }
        res.json({message:"Updated Successfully" , data: updatedNote})

    }catch(error){
        res.status(500).json({status:"error" , message:error.message})
    }
}
module.exports={
    getAll,
    create,
    getOne,
    remove,
    updatedNotes
}