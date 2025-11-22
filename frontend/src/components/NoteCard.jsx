

import { MdModeEdit, MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNotes } from "../api/noteAPI";




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
          className="text-gray-900 hover:text-gray-700 text-xl cursor-pointer transition-colors"
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

      
      <h3 className="text-lg font-semibold text-gray-800 mb-2 break-words pr-10">
        {note.title || "Untitled Note"}
      </h3>

      
      <p className="text-gray-600 text-sm leading-relaxed break-words">
        {shortBody || "No content yet..."}
      </p>

      
      {note.date && (
        <p className="text-gray-400 text-xs mt-3 text-right">
          {new Date(note.date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

export default NoteCard;
