import notes from './data/noteData'
import NoteForm from './pages/createNote';
import EditNote from './pages/editNote';
import Home from './pages/Home'
import NoteDetails from './pages/noteDetails'
import {BrowserRouter as Router , Routes, Route } from "react-router-dom";
function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home note={notes}/>} />
          <Route path="/NoteForm" element={<NoteForm/>} />
          <Route path="/edit/:id" element={<EditNote/>} />
          <Route path="/notes/:id" element={<NoteDetails />} />
         
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
