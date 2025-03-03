import React, { useState } from 'react';
import { FaPencilAlt, FaCog, FaCodeBranch } from 'react-icons/fa';
import { EditTab, SettingsTab, VersionTab } from './tabs';
import './ContentPanel.css';

type TabType = 'edit' | 'settings' | 'version';

interface ContentPanelProps {
  selectedFile?: string;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ selectedFile = 'Order' }) => {
  const [activeTab, setActiveTab] = useState<TabType>('edit');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'edit':
        return <EditTab selectedFile={selectedFile} />;
      case 'settings':
        return <SettingsTab selectedFile={selectedFile} />;
      case 'version':
        return <VersionTab selectedFile={selectedFile} />;
      default:
        return null;
    }
  };

  return (
    <div className="content-panel">
      <div className="content-header">
        <h2>{selectedFile}</h2>
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