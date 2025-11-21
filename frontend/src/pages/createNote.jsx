// import { useState } from "react";
// function NoteForm() {
 
//   const [title, setTitle] = useState("");

//   const [description, setDescription] = useState("");
  
//   return (
//     <div className="fixed inset-0  flex items-center justify-center z-50 px-4">
//       <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[600px] bg-white p-6 rounded-2xl shadow-xl mx-auto">
//         <form className="flex flex-col gap-1 p-4  w-full max-w-2xl mx-auto">
//           <h2  className="text-lg font-semibold mb-2">Add Note</h2>

//           <div>
//             <label className=" text-left block text-gray-700 text-sm font-medium mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(event) => setTitle(event.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-gray-500"
//             />
//           </div>
//           <div>
//             <label className="block text-left text-gray-700 text-sm font-medium mb-1">
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
//               Create Note
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default NoteForm;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNotes } from "../api/noteAPI";

function NoteForm({ onSave}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  
  const onCancel = () => {
  navigate("/"); 
};
  const handleSubmit = async(e) => {
    e.preventDefault();

    // if (title.trim() && description.trim()) {
    //   onSave && onSave({ title, body: description });
    //   setTitle("");
    //   setDescription("");

    //}

    if (!title.trim() || !description.trim()) {
      alert("Please fill in both fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await createNotes({ title, body: description});
      console.log("Note created:", response.data);

      onSave && onSave({ title, body });

      setTitle("");
      setDescription("");
      navigate("/"); 
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note.");
    } finally {
      setLoading(false);
    }
  }

   


  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 px-4">
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[600px] bg-white p-6 rounded-2xl shadow-2xl animate-fadeIn">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-2 w-full max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
            📝 Create a New Note
          </h2>

          {/* Title Field */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter note title..."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows="5"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Write your note details here..."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default NoteForm;
