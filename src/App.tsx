import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TaggingUI from './TaggingUI'
import FileUploader from './FileUploader'

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          <Link to="/" className="nav-link">Tagging UI</Link>
          <Link to="/file-uploader" className="nav-link">File Uploader</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<TaggingUI />} />
          <Route path="/file-uploader" element={<FileUploader />} />
        </Routes>
      </div>
    </Router>
  )
}