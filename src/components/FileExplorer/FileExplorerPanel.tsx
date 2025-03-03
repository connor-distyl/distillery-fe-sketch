import { useState } from 'react';
import FileExplorer, { FileItem } from './FileExplorer';
import PanelHeader, { PanelType } from '../common/PanelHeader';
import './FileExplorerPanel.css';

type FileExplorerPanelProps = {
  activePanel: PanelType;
  onSwitchPanel: (panel: PanelType) => void;
  onSelectFile: (fileName: string) => void;
}

const FileExplorerPanel = ({ 
  activePanel, 
  onSwitchPanel,
  onSelectFile
}: FileExplorerPanelProps) => {
  const [fileData, setFileData] = useState<FileItem[]>([
    {
      id: '6',
      name: 'Tower Bot',
      type: 'folder',
      expanded: true,
      children: [
        {
          id: '2',
          name: 'Tower Bot',
          type: 'file'
        },
        {
          id: '3',
          name: 'Routines',
          type: 'folder',
          expanded: true,
          children: [
            {
              id: '4',
              name: 'Order',
              type: 'file'
            },
            {
              id: '5',
              name: 'Gen Info',
              type: 'file'
            }
          ]
        },
        {
          id: '8',
          name: 'Prompts',
          type: 'folder',
          expanded: true,
          children: [
            {
              id: '7',
              name: 'Shared',
              type: 'file'
            },
            {
              id: '9',
              name: 'Tone',
              type: 'file'
            }
          ]
        },
        {
          id: '10',
          name: 'Tools',
          type: 'folder',
          expanded: true,
          children: [
            {
              id: '11',
              name: 'Device lookup',
              type: 'file'
            },
            {
              id: '12',
              name: 'Gen Info',
              type: 'file'
            }
          ]
        },
        {
          id: '13',
          name: 'Guardrails',
          type: 'folder'
        },
        {
          id: '14',
          name: 'Code',
          type: 'folder'
        }
      ]
    }
  ]);

  const [selectedFileId, setSelectedFileId] = useState<string | undefined>();

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

  const handleSelectFile = (fileName: string) => {
    // Find the file ID by name
    const findFileId = (items: FileItem[]): string | undefined => {
      for (const item of items) {
        if (item.type === 'file' && item.name === fileName) {
          return item.id;
        }
        if (item.children) {
          const foundId = findFileId(item.children);
          if (foundId) return foundId;
        }
      }
      return undefined;
    };

    const fileId = findFileId(fileData);
    setSelectedFileId(fileId);
    onSelectFile(fileName);
  };

  return (
    <div className="file-explorer-container">
      <PanelHeader 
        title="Explorer" 
        activePanel={activePanel} 
        onSwitchPanel={onSwitchPanel} 
      />
      <FileExplorer 
        data={fileData} 
        onToggle={handleToggle} 
        onSelectFile={handleSelectFile}
        selectedFileId={selectedFileId}
      />
    </div>
  );
};

export default FileExplorerPanel; 