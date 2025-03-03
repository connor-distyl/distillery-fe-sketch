import { useState } from 'react';
import './FileExplorer.css';

// File explorer item type
export type FileItem = {
  id: string;
  name: string;
  type: 'folder' | 'file';
  expanded?: boolean;
  children?: FileItem[];
}

type FileExplorerProps = {
  data: FileItem[];
  onToggle: (id: string) => void;
}

const FileExplorer = ({ data, onToggle }: FileExplorerProps) => {
  return (
    <ul className="file-explorer">
      {data.map((item) => (
        <li key={item.id}>
          <div 
            className={`file-item ${item.type === 'folder' ? 'folder' : 'file'}`}
            onClick={() => item.type === 'folder' && onToggle(item.id)}
          >
            {item.type === 'folder' && (
              <span className="folder-icon">{item.expanded ? '▼' : '▶'}</span>
            )}
            <span className="item-name">{item.name}</span>
          </div>
          {item.type === 'folder' && item.expanded && item.children && (
            <FileExplorer data={item.children} onToggle={onToggle} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default FileExplorer; 