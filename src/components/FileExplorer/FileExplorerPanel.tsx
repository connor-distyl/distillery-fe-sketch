import { useState } from 'react';
import FileExplorer from './FileExplorer';
import PanelHeader from '../common/PanelHeader';
import { fileStructure } from '../../data/versions';
import './FileExplorerPanel.css';

// Define interface for edited settings
interface EditedSettings {
  [fileId: string]: boolean;
}

// Define the TabType to match ContentPanel
type TabType = 'edit' | 'settings' | 'version';

type FileExplorerPanelProps = {
  onSelectFile: (fileName: string) => void;
  editedSettings: EditedSettings;
  selectedFileId?: string;
  onSetActiveTab?: (tab: TabType) => void;
}

const FileExplorerPanel = ({ 
  onSelectFile,
  editedSettings,
  selectedFileId: externalSelectedFileId
}: FileExplorerPanelProps) => {
  // Use the file structure from versions.ts instead of local state
  const [fileData, setFileData] = useState(fileStructure);

  const [internalSelectedFileId, setInternalSelectedFileId] = useState<string | undefined>();
  
  // Use external selectedFileId if provided, otherwise use internal state
  const selectedFileId = externalSelectedFileId || internalSelectedFileId;

  const handleToggle = (id: string) => {
    setFileData(prevData => {
      const toggleItem = (items: typeof fileStructure): typeof fileStructure => {
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
    const findFileId = (items: typeof fileStructure): string | undefined => {
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