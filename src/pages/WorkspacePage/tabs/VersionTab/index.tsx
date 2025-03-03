import React, { useState } from 'react';
import { FaTag, FaCheck, FaEye, FaEdit, FaCalendarAlt, FaUser, FaComment, FaToggleOn, FaToggleOff, FaList, FaCodeBranch } from 'react-icons/fa';
import ListView from './ListView';
import TreeView from './TreeView';
import ComponentVersions from './ComponentVersions';
import { Version, VersionState, ViewMode, ComponentColumnVisibility, Component, ComponentVersionData } from './types';
import '../VersionTab.css';

interface VersionTabProps {
  selectedFile: string;
}

const VersionTab: React.FC<VersionTabProps> = ({ selectedFile }) => {
  // State for view mode
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  // State for component column visibility
  const [componentColumnVisibility, setComponentColumnVisibility] = useState<ComponentColumnVisibility>({
    tag: true,
    date: true,
    user: true,
    message: true
  });

  // Mock data for current version
  const currentVersion: Version = {
    id: 'v1.0.0',
    tag: 'latest R3.27-1.0.0',
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
      tag: 'latest R3.27-1.0.0',
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
      tag: 'R3.27-0.9.1',
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
      tag: 'R3.27-0.9.0',
      name: selectedFile,
      date: '2023-02-05',
      user: 'John Doe',
      userInitials: 'JD',
      message: 'Setup basic structure',
      state: 'Published',
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
  const components: Component[] = [
    { id: 'c1', name: 'Routines/Order', type: 'routine' },
    { id: 'c2', name: 'Routines/Gen Info', type: 'routine' },
    { id: 'c3', name: 'Prompts/Shared', type: 'prompt' },
    { id: 'c4', name: 'Prompts/Tone', type: 'prompt' },
    { id: 'c5', name: 'Tools/Device lookup', type: 'tool' },
    { id: 'c6', name: 'Guardrails', type: 'guardrail' },
    { id: 'c7', name: 'Code', type: 'code' }
  ];

  // Mock data for component versions by system version
  const componentVersionsBySystemVersion: Record<string, ComponentVersionData[]> = {
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
  const renderComponentColumnToggle = (column: 'tag' | 'date' | 'user' | 'message', label: string, icon: React.ReactNode) => {
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
    const versionData = componentVersionsBySystemVersion[systemVersionId];
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
      {viewMode === 'list' ? (
        <ListView 
          currentVersion={currentVersion}
          versions={versions}
          isSystemFile={isSystemFile}
          renderStateBadge={renderStateBadge}
          renderUserAvatar={renderUserAvatar}
        />
      ) : (
        <TreeView 
          versions={versions}
          currentVersion={currentVersion}
          renderStateBadge={renderStateBadge}
          renderUserAvatar={renderUserAvatar}
          getBranchColor={getBranchColor}
          branches={branches}
        />
      )}

      {/* Component Versions Section (only for system files) */}
      {isSystemFile && viewMode === 'list' && (
        <ComponentVersions 
          versions={versions}
          components={components}
          componentColumnVisibility={componentColumnVisibility}
          renderComponentColumnToggle={renderComponentColumnToggle}
          getComponentVersionData={getComponentVersionData}
          renderUserAvatar={renderUserAvatar}
        />
      )}
    </div>
  );
};

export default VersionTab; 