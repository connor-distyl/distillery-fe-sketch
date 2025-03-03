import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import WorkspacePage from './pages/WorkspacePage';
import ChatPage from './pages/ChatPage';
import InspectPage from './pages/InspectPage';
import SimulatePage from './pages/SimulatePage';
import GenEditPage from './pages/GenEditPage';
import FeedbackPage from './pages/FeedbackPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/workspace" replace />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/inspect" element={<InspectPage />} />
            <Route path="/simulate" element={<SimulatePage />} />
            <Route path="/genedit" element={<GenEditPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
