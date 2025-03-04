import React from 'react';
import { FaFolder, FaComment } from 'react-icons/fa';
import './PanelHeader.css';

export type PanelType = 'files' | 'chat';

interface PanelHeaderProps {
  title: string;
  activePanel: PanelType;
  onSwitchPanel: (panel: PanelType) => void;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ 
  title, 
  activePanel, 
  onSwitchPanel
}) => {
  return (
    <div className="panel-header">
      <h2>{title}</h2>
      <div className="panel-icons">
        <button 
          className={`icon-button folder-btn ${activePanel === 'files' ? 'active' : ''}`}
          onClick={() => onSwitchPanel('files')}
          title="File Explorer"
        >
          <FaFolder />
        </button>
        <button 
          className={`icon-button chat-btn ${activePanel === 'chat' ? 'active' : ''}`}
          onClick={() => onSwitchPanel('chat')}
          title="Chat"
        >
          <FaComment />
        </button>
      </div>
    </div>
  );
};

export default PanelHeader; 