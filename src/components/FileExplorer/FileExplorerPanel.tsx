import { useState } from 'react';
import FileExplorer, { FileItem } from './FileExplorer';
import PanelHeader, { PanelType } from '../common/PanelHeader';
import './FileExplorerPanel.css';

type FileExplorerPanelProps = {
  activePanel: PanelType;
  onSwitchPanel: (panel: PanelType) => void;
}

const FileExplorerPanel = ({ activePanel, onSwitchPanel }: FileExplorerPanelProps) => {
  const [fileData, setFileData] = useState<FileItem[]>([
    {
      id: 'tower-bot',
      name: 'Tower Bot',
      type: 'folder',
      expanded: true,
      children: [
        {
          id: 'system',
          name: 'System',
          type: 'folder',
          expanded: true,
          children: [
            { id: 'tablet-1.0.1', name: 'Tablet 1.0.1', type: 'file' }
          ]
        },
        {
          id: 'routines',
          name: 'Routines',
          type: 'folder',
          expanded: true,
          children: [
            { id: 'order', name: 'Order', type: 'file' },
            { id: 'gen-info', name: 'Gen Info', type: 'file' }
          ]
        },
        {
          id: 'prompts',
          name: 'Prompts',
          type: 'folder',
          expanded: true,
          children: [
            { id: 'shared', name: 'Shared', type: 'file' },
            { id: 'tone', name: 'Tone', type: 'file' }
          ]
        },
        {
          id: 'tools',
          name: 'Tools',
          type: 'folder',
          expanded: true,
          children: [
            { id: 'device-lookup', name: 'Device lookup', type: 'file' },
            { id: 'gen-info-tools', name: 'Gen Info', type: 'file' }
          ]
        },
        {
          id: 'guardrails',
          name: 'Guardrails',
          type: 'folder',
          expanded: true,
          children: []
        },
        {
          id: 'code',
          name: 'Code',
          type: 'folder',
          expanded: true,
          children: []
        }
      ]
    }
  ]);

  // Handle folder toggle
  const handleToggle = (id: string) => {
    setFileData(prevData => {
      const toggleItem = (items: FileItem[]): FileItem[] => {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, expanded: !item.expanded };
          }
          if (item.children) {
            return { ...item, children: toggleItem(item.children) };
          }
          return item;
        });
      };
      return toggleItem(prevData);
    });
  };

  return (
    <div className="file-explorer-container">
      <PanelHeader 
        title="Explorer" 
        activePanel={activePanel} 
        onSwitchPanel={onSwitchPanel} 
      />
      <FileExplorer data={fileData} onToggle={handleToggle} />
    </div>
  );
};

export default FileExplorerPanel; 