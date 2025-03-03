import { useState } from 'react';
import '../styles/Pages.css';
import '../styles/ChatPage.css';

const ChatPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [system, setSystem] = useState('Infobot');
  const [routine, setRoutine] = useState('General Information');
  const [scenario, setScenario] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hello! I'm T-Mobile's AI Virtual Assistant. How can I help you today?", isUser: false }
  ]);
  const [inputText, setInputText] = useState('');

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, isUser: true }]);
      setInputText('');
      // Here you would typically call an API to get a response
      // For now, we'll just simulate a response after a short delay
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "I'm processing your request. How else can I assist you?", 
          isUser: false 
        }]);
      }, 1000);
    }
  };

  return (
    <div className="page-container chat-page">
      <div className="chat-header">
        <h1>Chat</h1>
        <div className="header-controls">
          <button className="icon-button" onClick={() => {}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
          </button>
          <button className="icon-button" onClick={() => {}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>
          <button className="icon-button chat-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="chat-container">
        <div className="system-selector">
          <label>System</label>
          <div className="select-wrapper">
            <select value={system} onChange={(e) => setSystem(e.target.value)}>
              <option value="Infobot">Infobot</option>
              <option value="Helpdesk">Helpdesk</option>
              <option value="Customer Service">Customer Service</option>
            </select>
          </div>
        </div>

        <div className="controls-center">
          <button className="icon-button" onClick={toggleSettings}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
          <button className="icon-button" onClick={() => {}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6"></path>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
          </button>
        </div>

        {showSettings && (
          <div className="settings-content">
            <div className="toggle-options">
              <div className="toggle-option">
                <span>Streaming</span>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={streaming} 
                    onChange={() => setStreaming(!streaming)} 
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="toggle-option">
                <span>Debug Mode</span>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={debugMode} 
                    onChange={() => setDebugMode(!debugMode)} 
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="selectors-row">
              <div className="routine-selector">
                <label>Routine</label>
                <div className="select-wrapper">
                  <select value={routine} onChange={(e) => setRoutine(e.target.value)}>
                    <option value="General Information">General Information</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing">Billing</option>
                  </select>
                </div>
              </div>

              <div className="scenario-input">
                <label>Scenario</label>
                <input 
                  type="text" 
                  value={scenario} 
                  onChange={(e) => setScenario(e.target.value)} 
                  placeholder="Enter scenario..." 
                  className="dark-input"
                />
              </div>
            </div>
          </div>
        )}

        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isUser ? 'user-message' : 'assistant-message'}`}>
              {message.text}
            </div>
          ))}
        </div>

        <form className="input-container" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)} 
            placeholder="Ask a question" 
          />
          <button type="button" className="voice-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
          <button type="submit" className="send-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage; 