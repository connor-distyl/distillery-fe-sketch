import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaCog, FaCodeBranch } from 'react-icons/fa';
import { EditTab, SettingsTab, VersionTab } from './tabs';
import './ContentPanel.css';

type TabType = 'edit' | 'settings' | 'version';

interface ContentPanelProps {
  selectedFile?: string;
  isEdited?: boolean;
  onSettingsChange?: (fileId: string, isEdited: boolean) => void;
  onSelectFile?: (fileName: string) => void;
  activeTab?: TabType;
  onSetActiveTab?: (tab: TabType) => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ 
  selectedFile = 'Order', 
  isEdited = false,
  onSettingsChange,
  onSelectFile,
  activeTab: externalActiveTab,
  onSetActiveTab
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<TabType>('edit');
  
  // Use external activeTab if provided, otherwise use internal state
  const activeTab = externalActiveTab || internalActiveTab;
  
  // Update internal state when external state changes
  useEffect(() => {
    if (externalActiveTab) {
      setInternalActiveTab(externalActiveTab);
    }
  }, [externalActiveTab]);

  const handleTabChange = (tab: TabType) => {
    if (onSetActiveTab) {
      onSetActiveTab(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

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
        return <VersionTab selectedFile={selectedFile} onSelectFile={onSelectFile} />;
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
              <FaPencilAlt size={20} color="#ff6b00" style={{ marginLeft: '10px', backgroundColor: 'rgba(255, 107, 0, 0.1)', borderRadius: '4px', filter: 'drop-shadow(0 0 2px rgba(255, 107, 0, 0.5))' }} />
            </span>
          )}
        </h2>
      </div>
      
      <div className="content-tabs">
        <button 
          className={`tab-button ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => handleTabChange('edit')}
        >
          <FaPencilAlt />
          <span>Edit</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabChange('settings')}
        >
          <FaCog />
          <span>Settings</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'version' ? 'active' : ''}`}
          onClick={() => handleTabChange('version')}
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