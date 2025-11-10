// import { MdModeEdit  , MdDelete} from "react-icons/md";
// import React from "react";

// function NoteCard({note}){
//     return(
//     <div className="relative border border-white rounded-lg p-2 mb-2 ">
//         <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
//         <p className="text-md font-semiblod mb-2">{note.body}</p>
//         <MdModeEdit className="absolute top-2 right-10 text-gray-500 cursor-pointer" />
//         <MdDelete className="absolute top-2 right-2 text-gray-600 cursor-pointer"/>

//     </div>
//     )

// }
// export default NoteCard;

import { MdModeEdit, MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNotes } from "../api/noteAPI";
import React from "react";



function NoteCard( { note, notes, setNotes } ) {
  const shortBody = note.body.split(" ").slice(0, 5).join(" ") + "...";

  const navigate = useNavigate()
  
    const handleDelete = async () => {
      await deleteNotes(note._id);
      // navigate("/");
      setNotes(notes.filter((n) => n._id !== note._id));
    };
  return (
    <div onClick={() => navigate(`/notes/${note._id}`)} className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100 min-h-[160px] flex flex-col justify-between">
      {/* Edit & Delete Icons */}
      <div className="absolute top-3 right-3 flex gap-3">
        <MdModeEdit
          className="text-blue-500 hover:text-blue-700 text-xl cursor-pointer transition-colors"
          onClick={async(e) => {
            navigate(`/edit/${note._id}`)
            e.stopPropagation();}}
        />
        <MdDelete
          className="text-red-500 hover:text-red-700 text-xl cursor-pointer transition-colors"
          
          onClick={async(e) => {
            e.stopPropagation();
            await handleDelete(note._id);
          }}
          
        />
      </div>

      {/* Note Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 break-words pr-10">
        {note.title || "Untitled Note"}
      </h3>

      {/* Note Body */}
      <p className="text-gray-600 text-sm leading-relaxed break-words">
        {shortBody || "No content yet..."}
      </p>

      {/* Optional Date */}
      {note.date && (
        <p className="text-gray-400 text-xs mt-3 text-right">
          {new Date(note.date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

export default NoteCard;
