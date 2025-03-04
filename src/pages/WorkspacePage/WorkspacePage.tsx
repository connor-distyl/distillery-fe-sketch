import { useState, useEffect } from 'react';
import FileExplorerPanel from '../../components/FileExplorer/FileExplorerPanel';
import ChatPanel from '../../components/ChatPanel/ChatPanel';
import ContentPanel from './ContentPanel';
import VersionPage from './VersionPage';
import SystemSelector from '../../components/SystemSelector/SystemSelector';
import { PanelType } from '../../components/common/PanelHeader';
import VersionSelector from '../../components/common/VersionSelector';
import { Version } from '../../data/versions';
import { systems } from '../../data/systems';
import './WorkspacePage.css';
import './VersionPage.css';

// Define interface for edited settings
interface EditedSettings {
  [fileId: string]: boolean;
}

// Define the TabType to match ContentPanel
type TabType = 'edit' | 'settings' | 'version';

// Map of file names to IDs (this would normally come from your data source)
const fileNameToIdMap: Record<string, string> = {
  'Order': '4',
  'Gen Info': '5',
  'Shared': '7',
  'Tone': '9',
  'Device lookup': '11',
  'Gen Info (Tool)': '12',
  'Guardrails': '13',
  'Code': '14'
};

const WorkspacePage = () => {
  const [columnWidth, setColumnWidth] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelType>('files');
  const [selectedFile, setSelectedFile] = useState<string>('Order');
  // Add state for tracking edited objects
  const [editedSettings, setEditedSettings] = useState<EditedSettings>({});
  const [selectedFileId, setSelectedFileId] = useState<string>('4'); // Default to Order's ID
  // Add state for active content tab
  const [activeContentTab, setActiveContentTab] = useState<TabType>('edit');
  // Add state for selected system
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  // Add state for active workspace tab
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'components' | 'versions' | 'actions'>('components');

  // Debug log for edited settings
  useEffect(() => {
    console.log('WorkspacePage: Current edited settings:', editedSettings);
  }, [editedSettings]);

  // Handle column resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newWidth = e.clientX - 80; // Adjust for sidebar width
      // Cap at 50% of window width
      const maxWidth = (window.innerWidth - 80) * 0.5;
      setColumnWidth(Math.min(Math.max(100, newWidth), maxWidth));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSwitchPanel = (panel: PanelType) => {
    setActivePanel(panel);
  };

  const handleSelectFile = (fileName: string) => {
    setSelectedFile(fileName);
    // Update the selected file ID
    if (fileNameToIdMap[fileName]) {
      setSelectedFileId(fileNameToIdMap[fileName]);
    }
  };

  // Function to handle setting edited state for a file
  const handleSettingsChange = (fileName: string, isEdited: boolean) => {
    // Get the file ID from the map
    const fileId = fileNameToIdMap[fileName] || fileName;
    
    console.log(`WorkspacePage: Setting edited state for ${fileName} (ID: ${fileId}) to ${isEdited}`);
    
    setEditedSettings(prev => {
      const newState = {
        ...prev,
        [fileId]: isEdited
      };
      console.log('WorkspacePage: New edited settings state:', newState);
      return newState;
    });
  };

  // Function to set the active tab in ContentPanel
  const handleSetActiveTab = (tab: TabType) => {
    setActiveContentTab(tab);
  };

  // Function to handle system selection
  const handleSelectSystem = (systemId: string) => {
    setSelectedSystemId(systemId);
  };

  // Function to handle version selection
  const handleVersionSelect = (version: Version) => {
    // Just log the selected version for now
    console.log('Selected version:', version);
  };

  // Function to handle view all versions
  const handleViewAllVersions = () => {
    console.log('View all versions clicked');
    // Switch to the versions tab
    handleWorkspaceTabChange('versions');
    
    // Add a small delay to ensure the DOM has updated
    setTimeout(() => {
      // Find the version history section and scroll to it
      const versionHistorySection = document.querySelector('.version-section:nth-child(2)');
      if (versionHistorySection) {
        versionHistorySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Function to handle workspace tab change
  const handleWorkspaceTabChange = (tab: 'components' | 'versions' | 'actions') => {
    setActiveWorkspaceTab(tab);
    
    // If switching to versions tab, set the content tab to version
    if (tab === 'versions') {
      setActiveContentTab('version');
    }
  };

  // Render system selector if no system is selected
  if (!selectedSystemId) {
    return (
      <div className="workspace-page system-selection-page">
        <div className="system-selection-header">
          <h1>Distyl</h1>
        </div>
        <SystemSelector 
          systems={systems}
          selectedSystemId={selectedSystemId}
          onSelectSystem={handleSelectSystem}
        />
      </div>
    );
  }

  // Find the selected system to display its name
  const selectedSystem = systems.find(system => system.id === selectedSystemId);

  return (
    <div 
      className="workspace-page" 
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="system-header">
        <div className="header-title">
          <div className="system-breadcrumb">
            <span 
              className="system-link"
              onClick={() => setSelectedSystemId(null)}
            >
              Systems
            </span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="current-system">{selectedSystem?.name}</span>
            <div className="breadcrumb-version-selector">
              <VersionSelector 
                onVersionSelect={handleVersionSelect}
                onViewAllClick={handleViewAllVersions}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* GitHub-style tabs */}
      <div className="workspace-tabs">
        <div 
          className={`workspace-tab ${activeWorkspaceTab === 'components' ? 'active' : ''}`}
          onClick={() => handleWorkspaceTabChange('components')}
        >
          Components
        </div>
        <div 
          className={`workspace-tab ${activeWorkspaceTab === 'versions' ? 'active' : ''}`}
          onClick={() => handleWorkspaceTabChange('versions')}
        >
          Versions
        </div>
        <div 
          className={`workspace-tab ${activeWorkspaceTab === 'actions' ? 'active' : ''}`}
          onClick={() => handleWorkspaceTabChange('actions')}
        >
          Actions
        </div>
      </div>
      
      {activeWorkspaceTab === 'components' ? (
        <div className="two-column-layout">
          <div className="left-column" style={{ width: `${columnWidth}px` }}>
            {activePanel === 'files' ? (
              <FileExplorerPanel 
                activePanel={activePanel}
                onSwitchPanel={handleSwitchPanel}
                onSelectFile={handleSelectFile}
                editedSettings={editedSettings}
                selectedFileId={selectedFileId}
                onSetActiveTab={handleSetActiveTab}
              />
            ) : (
              <ChatPanel 
                activePanel={activePanel}
                onSwitchPanel={handleSwitchPanel}
              />
            )}
          </div>
          <div className="column-resizer" onMouseDown={handleMouseDown}></div>
          <div className="right-column">
            <ContentPanel 
              selectedFile={selectedFile} 
              isEdited={!!editedSettings[fileNameToIdMap[selectedFile] || selectedFile]}
              onSettingsChange={handleSettingsChange}
              onSelectFile={handleSelectFile}
              activeTab={activeContentTab}
              onSetActiveTab={handleSetActiveTab}
            />
          </div>
        </div>
      ) : activeWorkspaceTab === 'versions' ? (
        <div className="full-width-content">
          <VersionPage 
            selectedFile={selectedFile}
            onSelectFile={handleSelectFile}
          />
        </div>
      ) : (
        <div className="full-width-content">
          <div className="placeholder-content">
            <h2>Actions</h2>
            <p>Actions functionality coming soon.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspacePage; 