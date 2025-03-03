import { useState } from 'react';
import FileExplorer, { FileItem } from './FileExplorer';
import PanelHeader, { PanelType } from '../common/PanelHeader';
import './FileExplorerPanel.css';

// Define interface for edited settings
interface EditedSettings {
  [fileId: string]: boolean;
}

type FileExplorerPanelProps = {
  activePanel: PanelType;
  onSwitchPanel: (panel: PanelType) => void;
  onSelectFile: (fileName: string) => void;
  editedSettings: EditedSettings;
  selectedFileId?: string;
}

const FileExplorerPanel = ({ 
  activePanel, 
  onSwitchPanel,
  onSelectFile,
  editedSettings,
  selectedFileId: externalSelectedFileId
}: FileExplorerPanelProps) => {
  const [fileData, setFileData] = useState<FileItem[]>([
    {
      id: '6',
      name: 'Tower Bot',
      type: 'system',
      expanded: true,
      children: [
        {
          id: '2',
          name: 'Tower Bot',
          type: 'system'
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
              type: 'routine'
            },
            {
              id: '5',
              name: 'Gen Info',
              type: 'routine'
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
              type: 'prompt'
            },
            {
              id: '9',
              name: 'Tone',
              type: 'prompt'
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
              type: 'tool'
            },
            {
              id: '12',
              name: 'Gen Info',
              type: 'tool'
            }
          ]
        },
        {
          id: '13',
          name: 'Guardrails',
          type: 'guardrail'
        },
        {
          id: '14',
          name: 'Code',
          type: 'code'
        }
      ]
    }
  ]);

  const [internalSelectedFileId, setInternalSelectedFileId] = useState<string | undefined>();
  
  // Use external selectedFileId if provided, otherwise use internal state
  const selectedFileId = externalSelectedFileId || internalSelectedFileId;

  const handleToggle = (id: string) => {
    setFileData(prevData => {
      const toggleItem = (items: FileItem[]): FileItem[] => {
        return items.map(item => {
          if (item.id === id && item.children) {
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
        if (item.type !== 'folder' && item.name === fileName) {
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
    setInternalSelectedFileId(fileId);
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
        editedSettings={editedSettings}
      />
    </div>
  );
};

export default FileExplorerPanel; 