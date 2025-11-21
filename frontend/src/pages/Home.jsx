

import initialNotes from "../data/noteData";
import NoteCard from "../components/noteCard";
import { getNotes  } from "../api/noteAPI";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import NoteForm  from "./createNote"; 
  

function Home() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate(); 

  console.log("Home component rendered:", notes);



   useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await getNotes(); // call API function
        setNotes(response.data.data);       // adjust based on your API
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    loadNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center p-6">
      {/* Header */}
      <header className="flex items-center justify-between w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📝 My Notes</h1>
        <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-2xl shadow hover:bg-gray-700 transition"
        onClick={() => navigate("/NoteForm")} >
          <PlusCircle size={20} />
          Add Note
        </button>
      </header>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {notes.length > 0 ? (
          notes.map((note) => (
            <motion.div
              key={note._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <NoteCard note={note} notes={notes} setNotes={setNotes} />
            </motion.div>
          ))
        ) : (
          <div className="text-gray-500 text-center w-full mt-20">
            No notes found. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
