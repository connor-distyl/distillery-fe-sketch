import { useState } from 'react';
import FileExplorerPanel from '../../components/FileExplorer/FileExplorerPanel';
import ChatPanel from '../../components/ChatPanel/ChatPanel';
import ContentPanel from './ContentPanel';
import { PanelType } from '../../components/common/PanelHeader';
import './WorkspacePage.css';

const WorkspacePage = () => {
  const [columnWidth, setColumnWidth] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelType>('files');
  const [selectedFile, setSelectedFile] = useState<string>('Order');

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
  };

  return (
    <div 
      className="workspace-page" 
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="two-column-layout">
        <div className="left-column" style={{ width: `${columnWidth}px` }}>
          {activePanel === 'files' ? (
            <FileExplorerPanel 
              activePanel={activePanel}
              onSwitchPanel={handleSwitchPanel}
              onSelectFile={handleSelectFile}
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
          <ContentPanel selectedFile={selectedFile} />
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage; 