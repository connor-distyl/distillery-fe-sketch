import React, { useState } from 'react';
import { FaTag, FaCheck, FaEye, FaEdit, FaList, FaCodeBranch } from 'react-icons/fa';
import { 
  Version, 
  VersionState, 
  ViewMode,
  versionHistory,
  getCurrentVersion,
  getUniqueBranches,
  getBranchColor
} from '../../data/versions';
import ListView from './tabs/VersionTab/ListView';
import TreeView from './tabs/VersionTab/TreeView';
import ComponentVersions from './tabs/VersionTab/ComponentVersions';
import { components, componentVersionsBySystemVersion } from '../../data/versions';
import './tabs/VersionTab.css';

interface VersionPageProps {
  selectedFile: string;
  onSelectFile?: (fileName: string) => void;
}

const VersionPage: React.FC<VersionPageProps> = ({ selectedFile, onSelectFile }) => {
  // State for view mode
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  // Get current version for the selected file
  const currentVersion = getCurrentVersion(selectedFile);

  // Check if the selected file is a system
  const isSystemFile = selectedFile === 'Tower Bot';

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

  // Function to render tags
  const renderTags = (tagString: string) => {
    if (!tagString) return null;
    
    // Split the tag string by spaces to get individual tags
    const tags = tagString.split(' ');
    
    return (
      <>
        {tags.map((tag, index) => (
          <span key={index} className="version-tag">
            <FaTag />
            {tag}
          </span>
        ))}
      </>
    );
  };

  // Function to get component version data for a specific system version and component
  const getComponentVersionData = (systemVersionId: string, componentId: string) => {
    const versionData = componentVersionsBySystemVersion[systemVersionId];
    if (!versionData) return null;
    
    return versionData.find(item => item.componentId === componentId) || null;
  };

  // Get unique branches
  const branches = getUniqueBranches();

  return (
    <div className="version-page">
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

      {viewMode === 'list' ? (
        <>
          {/* Current version info - only shown in list view */}
          <div className="version-section">
            <h3>Current Version</h3>
            <table className="version-table">
              <thead>
                <tr>
                  <th>Tag</th>
                  <th>System Version</th>
                  <th>Date</th>
                  <th>User</th>
                  <th>Message</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                <tr className="current-version-row">
                  <td>
                    {renderTags(currentVersion.tag)}
                    <span className="current-version-indicator">Current</span>
                  </td>
                  <td>
                    <a href="#" className="commit-hash-link">
                      {currentVersion.commitHash}
                    </a>
                  </td>
                  <td>{currentVersion.date}</td>
                  <td>{renderUserAvatar(currentVersion.userInitials)}</td>
                  <td>{currentVersion.message}</td>
                  <td>{renderStateBadge(currentVersion.state)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Version history - only shown in list view */}
          <div className="version-section">
            <h3>Version History</h3>
            <ListView 
              versions={versionHistory} 
              renderStateBadge={renderStateBadge}
              renderUserAvatar={renderUserAvatar}
            />
          </div>

          {/* Component versions - only shown in list view and for system files */}
          {isSystemFile && (
            <div className="version-section">
              <h3>Component Versions</h3>
              <ComponentVersions 
                versions={versionHistory}
                components={components}
                getComponentVersionData={getComponentVersionData}
                renderUserAvatar={renderUserAvatar}
              />
            </div>
          )}
        </>
      ) : (
        // Tree view - only shown in tree mode
        <div className="version-section">
          <h3>Source Tree</h3>
          <TreeView 
            versions={versionHistory} 
            renderStateBadge={renderStateBadge}
            renderUserAvatar={renderUserAvatar}
            branches={branches}
            getBranchColor={getBranchColor}
          />
        </div>
      )}
    </div>
  );
};

export default VersionPage; 