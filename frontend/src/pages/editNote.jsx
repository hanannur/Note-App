// import { useState } from "react";
// function EditNote() {
 
//   const [title, setTitle] = useState("");

//   const [description, setDescription] = useState("");
  
//   return (
//     <div className="fixed inset-0  flex items-center justify-center z-50 px-4">
//       <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[600px] bg-white p-6 rounded-2xl shadow-xl mx-auto">
//         <form className="flex flex-col gap-1 p-2">
//           <h2>Edit Note</h2>

//           <div>
//             <label className=" text-left block text-gray-700 text-sm font-medium mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(event) => setTitle(event.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-left text-gray-700 text-sm font-medium mb-2">
//               Description
//             </label>
//             <textarea
//               rows="5"
//               type="text"
//               value={description}
//               onChange={(event) => setContent(event.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
          

//           <div className="flex justify-between">
//             <button
//               type="button"
//               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
//             >
//               save change
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditNote;

import { useState , useEffect} from "react";
import { useNavigate ,useParams } from "react-router-dom";
import { getNoteById , editNotes } from "../api/noteAPI";



function EditNote() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true);
  // const [title, setTitle] = useState(initialNote.title || "");
  // const [description, setDescription] = useState(initialNote.body || "");


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

    const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Editing note with id:", id);
  console.log("Payload:", note);
    try {
      await editNotes(id, note);
      navigate("/"); // redirect to home after successful update
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  const handleCancel = () => navigate("/");


  return (
    // <div className="fixed inset-0 bg-gradient-to-r from-blue-400/30 via-purple-500/30 to-pink-500/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md flex items-center justify-center z-50 px-4"
     style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05), transparent 50%)' }}>
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[600px] bg-white p-6 rounded-2xl shadow-2xl animate-fadeIn">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
            ✏️ Edit Note
          </h2>

          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="Enter note title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows="5"
              name="body"

              value={note.body}
              onChange={handleChange}
              placeholder="Write your note here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Cancel
            </button>
            <button
              
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={handleChange}
            
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNote;
