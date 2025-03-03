import React, { useState } from 'react';
import { FaTag, FaCheck, FaEye, FaEdit, FaCalendarAlt, FaUser, FaComment, FaToggleOn, FaToggleOff, FaList, FaCodeBranch } from 'react-icons/fa';
import './VersionTab.css';

interface VersionTabProps {
  selectedFile: string;
}

// Version state types
type VersionState = 'Draft' | 'In Review' | 'Published';

// View mode type
type ViewMode = 'list' | 'tree';

// Interface for version data
interface Version {
  id: string;
  tag: string;
  name: string;
  date: string;
  user: string;
  userInitials: string;
  message: string;
  state: VersionState;
  parentId?: string; // Parent version ID for tree view
  branch?: string; // Branch name for tree view
}

const VersionTab: React.FC<VersionTabProps> = ({ selectedFile }) => {
  // State for view mode
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  // State for component column visibility
  const [componentColumnVisibility, setComponentColumnVisibility] = useState({
    tag: true,
    date: true,
    user: true,
    message: true
  });

  // Mock data for current version
  const currentVersion: Version = {
    id: 'v1.0.0',
    tag: 'latest',
    name: selectedFile,
    date: '2023-03-01',
    user: 'John Doe',
    userInitials: 'JD',
    message: 'Updated content structure',
    state: 'Published',
    branch: 'main'
  };

  // Mock data for version history with parent relationships
  const versions: Version[] = [
    {
      id: 'v1.0.0',
      tag: 'latest',
      name: selectedFile,
      date: '2023-03-01',
      user: 'John Doe',
      userInitials: 'JD',
      message: 'Updated content structure',
      state: 'Published',
      parentId: 'v0.9.0',
      branch: 'main'
    },
    {
      id: 'v0.9.0',
      tag: 'stable',
      name: selectedFile,
      date: '2023-02-15',
      user: 'Jane Smith',
      userInitials: 'JS',
      message: 'Fixed formatting issues',
      state: 'In Review',
      parentId: 'v0.8.0',
      branch: 'main'
    },
    {
      id: 'v0.8.0',
      tag: '',
      name: selectedFile,
      date: '2023-02-10',
      user: 'Mike Johnson',
      userInitials: 'MJ',
      message: 'Initial draft',
      state: 'Draft',
      parentId: 'v0.7.0',
      branch: 'main'
    },
    {
      id: 'v0.7.0',
      tag: '',
      name: selectedFile,
      date: '2023-02-05',
      user: 'John Doe',
      userInitials: 'JD',
      message: 'Setup basic structure',
      state: 'Draft',
      branch: 'main'
    },
    {
      id: 'v0.6.0',
      tag: '',
      name: selectedFile,
      date: '2023-02-01',
      user: 'Jane Smith',
      userInitials: 'JS',
      message: 'Feature implementation',
      state: 'Draft',
      parentId: 'v0.4.0',
      branch: 'feature/new-ui'
    },
    {
      id: 'v0.5.0',
      tag: '',
      name: selectedFile,
      date: '2023-01-28',
      user: 'Mike Johnson',
      userInitials: 'MJ',
      message: 'Bug fix implementation',
      state: 'Draft',
      parentId: 'v0.4.0',
      branch: 'fix/bug-123'
    },
    {
      id: 'v0.4.0',
      tag: '',
      name: selectedFile,
      date: '2023-01-25',
      user: 'John Doe',
      userInitials: 'JD',
      message: 'Initial implementation',
      state: 'Draft',
      branch: 'main'
    }
  ];

  // Define components for the system
  const components = [
    { id: 'c1', name: 'Routines/Order', type: 'routine' },
    { id: 'c2', name: 'Routines/Gen Info', type: 'routine' },
    { id: 'c3', name: 'Prompts/Shared', type: 'prompt' },
    { id: 'c4', name: 'Prompts/Tone', type: 'prompt' },
    { id: 'c5', name: 'Tools/Device lookup', type: 'tool' },
    { id: 'c6', name: 'Guardrails', type: 'guardrail' },
    { id: 'c7', name: 'Code', type: 'code' }
  ];

  // Mock data for component versions by system version
  const componentVersionsBySystemVersion = {
    'v1.0.0': [
      { componentId: 'c1', tag: 'v2.3.13.02', date: '2023-03-01', user: 'JD', message: 'Updated order flow' },
      { componentId: 'c2', tag: 'v2.3.13.01', date: '2023-02-28', user: 'JS', message: 'Fixed information retrieval' },
      { componentId: 'c3', tag: 'v2.3.9.02', date: '2023-02-25', user: 'MJ', message: 'Updated shared prompts' },
      { componentId: 'c4', tag: 'v2.3.9.01', date: '2023-02-20', user: 'SL', message: 'Improved tone consistency' },
      { componentId: 'c5', tag: 'v2.3.7.03', date: '2023-02-18', user: 'JD', message: 'Enhanced device detection' },
      { componentId: 'c6', tag: 'v2.3.5.01', date: '2023-02-15', user: 'JS', message: 'Updated safety protocols' },
      { componentId: 'c7', tag: 'v2.3.4.02', date: '2023-02-10', user: 'MJ', message: 'Optimized performance' }
    ],
    'v0.9.0': [
      { componentId: 'c1', tag: 'v2.3.9.02', date: '2023-02-14', user: 'JS', message: 'Fixed order validation' },
      { componentId: 'c2', tag: 'v2.3.9.01', date: '2023-02-12', user: 'MJ', message: 'Added new info fields' },
      { componentId: 'c3', tag: 'v2.3.7.01', date: '2023-02-10', user: 'JD', message: 'Refactored prompts' },
      { componentId: 'c4', tag: 'v2.3.7.01', date: '2023-02-10', user: 'JD', message: 'Refactored prompts' },
      { componentId: 'c5', tag: 'v2.3.5.02', date: '2023-02-08', user: 'SL', message: 'Added new devices' },
      { componentId: 'c6', tag: 'v2.3.4.01', date: '2023-02-05', user: 'JS', message: 'Initial guardrails' },
      { componentId: 'c7', tag: 'v2.3.2.01', date: '2023-02-01', user: 'MJ', message: 'Initial code setup' }
    ],
    'v0.8.0': [
      { componentId: 'c1', tag: 'v2.3.5.01', date: '2023-02-08', user: 'MJ', message: 'Initial order flow' },
      { componentId: 'c2', tag: 'v2.3.5.01', date: '2023-02-08', user: 'MJ', message: 'Initial info structure' },
      { componentId: 'c3', tag: 'v2.3.4.01', date: '2023-02-05', user: 'JD', message: 'Basic prompts' },
      { componentId: 'c4', tag: 'v2.3.4.01', date: '2023-02-05', user: 'JD', message: 'Basic prompts' },
      { componentId: 'c5', tag: 'v2.3.2.01', date: '2023-02-01', user: 'JS', message: 'Basic device lookup' },
      { componentId: 'c6', tag: '', date: '', user: '', message: 'Not implemented' },
      { componentId: 'c7', tag: '', date: '', user: '', message: 'Not implemented' }
    ]
  };

  // Check if the selected file is a system
  const isSystemFile = selectedFile === 'Tower Bot';

  // Function to toggle component column visibility
  const toggleComponentColumnVisibility = (column: keyof typeof componentColumnVisibility) => {
    setComponentColumnVisibility(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  // Function to render state badge
  const renderStateBadge = (state: VersionState) => {
    switch (state) {
      case 'Draft':
        return <span className="state-badge draft"><FaEdit /> Draft</span>;
      case 'In Review':
        return <span className="state-badge review"><FaEye /> In Review</span>;
      case 'Published':
        return <span className="state-badge published"><FaCheck /> Published</span>;
      default:
        return null;
    }
  };

  // Function to render user avatar
  const renderUserAvatar = (initials: string) => {
    return initials ? <div className="user-avatar">{initials}</div> : null;
  };

  // Function to render component column toggle button
  const renderComponentColumnToggle = (column: keyof typeof componentColumnVisibility, label: string, icon: React.ReactNode) => {
    return (
      <button 
        className={`column-toggle ${componentColumnVisibility[column] ? 'active' : ''}`}
        onClick={() => toggleComponentColumnVisibility(column)}
        title={`Toggle ${label} visibility`}
      >
        {icon}
        <span>{label}</span>
        {componentColumnVisibility[column] ? <FaToggleOn /> : <FaToggleOff />}
      </button>
    );
  };

  // Function to get component version data for a specific system version and component
  const getComponentVersionData = (systemVersionId: string, componentId: string) => {
    const versionData = componentVersionsBySystemVersion[systemVersionId as keyof typeof componentVersionsBySystemVersion];
    if (!versionData) return null;
    
    return versionData.find(item => item.componentId === componentId) || null;
  };

  // Function to get unique branches from versions
  const getUniqueBranches = () => {
    const branches = new Set<string>();
    versions.forEach(version => {
      if (version.branch) {
        branches.add(version.branch);
      }
    });
    return Array.from(branches);
  };

  // Get unique branches
  const branches = getUniqueBranches();

  // Function to get branch color
  const getBranchColor = (branch: string) => {
    const colors = ['#4a6bdf', '#9c27b0', '#2196f3', '#009688', '#ff5722'];
    const index = branches.indexOf(branch) % colors.length;
    return colors[index];
  };

  // Render list view
  const renderListView = () => {
    return (
      <>
        {/* Current Version Section */}
        <div className="version-section">
          <h3>Current Version</h3>
          <table className="version-table">
            <thead>
              <tr>
                <th>Tag</th>
                <th>Name</th>
                <th>Date</th>
                <th>User</th>
                <th>Message</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {currentVersion.tag && (
                    <span className="version-tag">
                      <FaTag />
                      {currentVersion.tag}
                    </span>
                  )}
                </td>
                <td>{currentVersion.name}</td>
                <td>{currentVersion.date}</td>
                <td>{renderUserAvatar(currentVersion.userInitials)}</td>
                <td>{currentVersion.message}</td>
                <td>{renderStateBadge(currentVersion.state)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Version History Section */}
        <div className="version-section">
          <h3>Version History</h3>
          <table className="version-table">
            <thead>
              <tr>
                <th>Tag</th>
                <th>Name</th>
                <th>Date</th>
                <th>User</th>
                <th>Message</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {versions.map((version) => (
                <tr key={version.id}>
                  <td>
                    {version.tag && (
                      <span className="version-tag">
                        <FaTag />
                        {version.tag}
                      </span>
                    )}
                  </td>
                  <td>{version.name}</td>
                  <td>{version.date}</td>
                  <td>{renderUserAvatar(version.userInitials)}</td>
                  <td>{version.message}</td>
                  <td>{renderStateBadge(version.state)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  // Render tree view
  const renderTreeView = () => {
    return (
      <div className="version-section">
        <h3>Source Tree</h3>
        <div className="source-tree-container">
          <div className="source-tree-header">
            <div className="branch-column">Version</div>
            <div className="graph-column">Graph</div>
            <div className="message-column">Commit Message</div>
          </div>
          <div className="source-tree-content">
            {versions.map((version, index) => {
              // Calculate branch lines
              const branchLines: { branch: string; start: number; end: number; color: string }[] = [];
              
              // Add main branch line
              if (version.branch === 'main') {
                branchLines.push({
                  branch: 'main',
                  start: 0,
                  end: versions.length,
                  color: getBranchColor('main')
                });
              }
              
              // Add feature branch lines
              branches.forEach(branch => {
                if (branch !== 'main') {
                  const branchVersions = versions.filter(v => v.branch === branch);
                  if (branchVersions.length > 0) {
                    const firstIndex = versions.findIndex(v => v.id === branchVersions[0].id);
                    
                    // Find parent in main branch
                    const parentVersion = versions.find(v => 
                      branchVersions[branchVersions.length - 1].parentId === v.id && v.branch === 'main'
                    );
                    
                    const parentIndex = parentVersion ? versions.findIndex(v => v.id === parentVersion.id) : -1;
                    
                    if (parentIndex !== -1) {
                      branchLines.push({
                        branch,
                        start: firstIndex,
                        end: parentIndex,
                        color: getBranchColor(branch)
                      });
                    }
                  }
                }
              });

              return (
                <div key={version.id} className="source-tree-row">
                  <div className="branch-column">
                    <div className="version-tag" style={{ backgroundColor: getBranchColor(version.branch || '') }}>
                      <FaTag />
                      <span>{version.id}</span>
                      {index === 0 && <span className="latest-tag">latest</span>}
                    </div>
                  </div>
                  <div className="graph-column">
                    <div className="graph-visualization">
                      {branchLines.map((line, lineIndex) => {
                        const isActive = index >= line.start && index <= line.end;
                        const isCommit = version.branch === line.branch;
                        
                        return (
                          <div 
                            key={`line-${lineIndex}`} 
                            className={`branch-line ${isActive ? 'active' : ''} ${isCommit ? 'commit' : ''}`}
                            style={{ 
                              backgroundColor: isActive ? line.color : 'transparent',
                              left: `${(lineIndex + 1) * 20}px`
                            }}
                          >
                            {isCommit && (
                              <div className="commit-dot" style={{ backgroundColor: line.color }}>
                                {version.id === currentVersion.id && <div className="current-indicator" />}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="message-column">
                    <div className="commit-message">
                      <div className="message-text">{version.message}</div>
                    </div>
                    <div className="commit-details">
                      <span className="commit-date">{version.date}</span>
                      <span className="commit-user">{renderUserAvatar(version.userInitials)}</span>
                      <span className="commit-state">{renderStateBadge(version.state)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="version-tab">
      {/* View mode toggle */}
      <div className="view-mode-toggle">
        <button 
          className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
          title="List View"
        >
          <FaList />
          <span>List View</span>
        </button>
        <button 
          className={`view-mode-button ${viewMode === 'tree' ? 'active' : ''}`}
          onClick={() => setViewMode('tree')}
          title="Tree View"
        >
          <FaCodeBranch />
          <span>Tree View</span>
        </button>
      </div>

      {/* Render view based on selected mode */}
      {viewMode === 'list' ? renderListView() : renderTreeView()}

      {/* Component Versions Section (only for system files) */}
      {isSystemFile && viewMode === 'list' && (
        <div className="version-section">
          <h3>Component Versions</h3>
          
          {/* Component column visibility controls */}
          <div className="column-toggles component-toggles">
            <h4>Toggle Component Columns:</h4>
            <div className="toggle-buttons">
              {renderComponentColumnToggle('tag', 'Tag', <FaTag />)}
              {renderComponentColumnToggle('date', 'Date', <FaCalendarAlt />)}
              {renderComponentColumnToggle('user', 'User', <FaUser />)}
              {renderComponentColumnToggle('message', 'Message', <FaComment />)}
            </div>
          </div>
          
          <div className="component-versions-table-container">
            <table className="version-table component-table">
              <thead>
                <tr className="component-header-row">
                  <th className="version-column">Version</th>
                  {components.map(component => (
                    <th key={component.id} colSpan={Object.values(componentColumnVisibility).filter(Boolean).length} className={`component-header ${component.type}`}>
                      <span className={`component-type ${component.type}`}>{component.type}</span>
                      {component.name}
                    </th>
                  ))}
                </tr>
                <tr className="subheader-row">
                  <th></th> {/* Empty cell for version column */}
                  {components.map(component => (
                    <React.Fragment key={`subheader-${component.id}`}>
                      {componentColumnVisibility.tag && <th className="subheader">Tag</th>}
                      {componentColumnVisibility.date && <th className="subheader">Date</th>}
                      {componentColumnVisibility.user && <th className="subheader">User</th>}
                      {componentColumnVisibility.message && <th className="subheader">Message</th>}
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {versions.map(version => (
                  <tr key={`component-row-${version.id}`} className="component-row">
                    <td className="version-cell">
                      <span className="version-tag">
                        <FaTag />
                        {version.id}
                      </span>
                    </td>
                    {components.map(component => {
                      const componentData = getComponentVersionData(version.id, component.id);
                      return (
                        <React.Fragment key={`${version.id}-${component.id}`}>
                          {componentColumnVisibility.tag && (
                            <td>
                              {componentData?.tag && (
                                <span className="version-tag">
                                  <FaTag />
                                  {componentData.tag}
                                </span>
                              )}
                            </td>
                          )}
                          {componentColumnVisibility.date && <td>{componentData?.date || '-'}</td>}
                          {componentColumnVisibility.user && <td>{componentData?.user ? renderUserAvatar(componentData.user) : '-'}</td>}
                          {componentColumnVisibility.message && <td>{componentData?.message || '-'}</td>}
                        </React.Fragment>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionTab; 