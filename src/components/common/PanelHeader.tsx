import React from 'react';
import { FaFolder, FaComment } from 'react-icons/fa';
import VersionSelector from './VersionSelector';
import { Version } from '../../data/versions';
import './PanelHeader.css';

export type PanelType = 'files' | 'chat';

interface PanelHeaderProps {
  title: string;
  activePanel: PanelType;
  onSwitchPanel: (panel: PanelType) => void;
  onVersionSelect?: (version: Version) => void;
  showVersionSelector?: boolean;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ 
  title, 
  activePanel, 
  onSwitchPanel,
  onVersionSelect,
  showVersionSelector = true
}) => {
  return (
    <div className="panel-header">
      <h2>{title}</h2>
      {showVersionSelector && (
        <VersionSelector onVersionSelect={onVersionSelect} />
      )}
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