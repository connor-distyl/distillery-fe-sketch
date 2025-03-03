import React, { useState } from 'react';
import { FaPencilAlt, FaCog, FaCodeBranch, FaExclamationCircle } from 'react-icons/fa';
import { EditTab, SettingsTab, VersionTab } from './tabs';
import './ContentPanel.css';

type TabType = 'edit' | 'settings' | 'version';

interface ContentPanelProps {
  selectedFile?: string;
  isEdited?: boolean;
  onSettingsChange?: (fileId: string, isEdited: boolean) => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ 
  selectedFile = 'Order', 
  isEdited = false,
  onSettingsChange
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('edit');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'edit':
        return <EditTab selectedFile={selectedFile} />;
      case 'settings':
        return (
          <SettingsTab 
            selectedFile={selectedFile} 
            onSettingsChange={onSettingsChange}
          />
        );
      case 'version':
        return <VersionTab selectedFile={selectedFile} />;
      default:
        return null;
    }
  };

  return (
    <div className="content-panel">
      <div className="content-header">
        <h2>
          {selectedFile}
          {isEdited && (
            <span className="content-edited-badge" title="This item has unsaved changes">
              <FaExclamationCircle size={18} color="#ff6b00" style={{ marginLeft: '10px' }} />
            </span>
          )}
        </h2>
      </div>
      
      <div className="content-tabs">
        <button 
          className={`tab-button ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          <FaPencilAlt />
          <span>Edit</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <FaCog />
          <span>Settings</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'version' ? 'active' : ''}`}
          onClick={() => setActiveTab('version')}
        >
          <FaCodeBranch />
          <span>Version</span>
        </button>
      </div>
      
      <div className="content-body">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ContentPanel; 