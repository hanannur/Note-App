import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editNotes, getNoteById, deleteNotes } from "../api/noteAPI";
import { MdModeEdit, MdDelete } from "react-icons/md";

function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await getNoteById(id);
        setNote(response.data.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  (() => setLoading(false));
  

  const handleDelete = async () => {
    await deleteNotes(id);
    navigate("/"); 
  };

  if (loading)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  if (!note)
    return (
      <div className="text-center mt-20 text-gray-500">Note not found.</div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline flex items-center"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{note.title}</h1>
        <div className="flex gap-4">
          <MdModeEdit
            className="text-blue-500 hover:text-blue-700 text-xl cursor-pointer transition-colors"
            onClick={() => navigate(`/edit/${note._id}`)}
            
          />
          
          <MdDelete className="text-red-500 hover:text-red-700 text-xl cursor-pointer transition-colors" onClick={handleDelete} />
        </div>
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {note.body}
        </p>
      </div>
    </div>
  );
}

export default NoteDetails;
