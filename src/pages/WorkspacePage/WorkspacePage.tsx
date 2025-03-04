import { useState, useEffect } from 'react';
import FileExplorerPanel from '../../components/FileExplorer/FileExplorerPanel';
import ChatPanel from '../../components/ChatPanel/ChatPanel';
import ContentPanel from './ContentPanel';
import SystemSelector from '../../components/SystemSelector/SystemSelector';
import { PanelType } from '../../components/common/PanelHeader';
import { systems } from '../../data/systems';
import './WorkspacePage.css';

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
          <h1>Distyl</h1>
          <div className="system-breadcrumb">
            <span 
              className="system-link"
              onClick={() => setSelectedSystemId(null)}
            >
              Systems
            </span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="current-system">{selectedSystem?.name}</span>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default WorkspacePage; 