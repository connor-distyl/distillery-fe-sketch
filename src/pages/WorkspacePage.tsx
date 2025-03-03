import { useState } from 'react';
import '../App.css';

// File explorer item type
type FileItem = {
  id: string;
  name: string;
  type: 'folder' | 'file';
  expanded?: boolean;
  children?: FileItem[];
}

function FileExplorer({ data, onToggle }: { data: FileItem[], onToggle: (id: string) => void }) {
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
  )
}

const WorkspacePage = () => {
  const [columnWidth, setColumnWidth] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
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

  return (
    <div 
      className="page-container" 
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="two-column-layout">
        <div className="left-column" style={{ width: `${columnWidth}px` }}>
          <div className="file-explorer-container">
            <h2>Explorer</h2>
            <div className="explorer-icons">
              <button className="icon-button folder-btn" title="Files">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
                </svg>
              </button>
              <button className="icon-button chat-btn" title="Chat">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                </svg>
              </button>
            </div>
            <FileExplorer data={fileData} onToggle={handleToggle} />
          </div>
        </div>
        <div className="column-resizer" onMouseDown={handleMouseDown}></div>
        <div className="right-column">
          <h1>Workspace</h1>
          <p>Welcome to the Tower Bot Workspace</p>
          <div className="card">
            <p>
              This is the file explorer workspace where you can manage your files.
            </p>
            <p>
              The left column shows a file explorer that can be resized by dragging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage; 