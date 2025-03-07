import React, { useState } from 'react';
import { FaTag, FaCheck, FaEye, FaEdit, FaList, FaCodeBranch, FaStar } from 'react-icons/fa';
import { 
  Version, 
  VersionState, 
  ViewMode,
  versionHistory,
  getCurrentVersion,
  getUniqueBranches,
  getBranchColor
} from '../../data/versions';
import { 
  Branch,
  publicBranches,
  privateBranches,
  getAllBranches,
  getUserDraftBranches
} from '../../data/branches';
import ListView from './tabs/VersionTab/ListView';
import TreeView from './tabs/VersionTab/TreeView';
import ComponentVersions from './tabs/VersionTab/ComponentVersions';
import { components, componentVersionsBySystemVersion } from '../../data/versions';
import './tabs/VersionTab.css';

// Define the tab types
type TabType = 'public' | 'drafts' | 'all' | 'tags' | 'history';

interface VersionPageProps {
  selectedFile: string;
  onSelectFile?: (fileName: string) => void;
}

const VersionPage: React.FC<VersionPageProps> = ({ selectedFile }) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<TabType>('public');
  
  // State for view mode
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  // Get current version for the selected file
  const currentVersion = getCurrentVersion(selectedFile);

  // Check if the selected file is a system
  const isSystemFile = selectedFile === 'Tower Bot';

  // Mock current user
  const currentUser = 'James Wilson';
  
  // Get user's draft branches
  const userDraftBranches = getUserDraftBranches(currentUser);

  // Get all branches
  const allBranches = getAllBranches();

  const taggedVersions: Version[] = versionHistory.map(version => ({
    ...version,
    tag: version.tag || `${version.branch}-${version.id}`,
    state: 'Published' as VersionState
  }));

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

  // Function to render promote button for draft branches
  const renderPromoteButton = (state: VersionState) => {
    if (state === 'Draft') {
      return (
        <button className="promote-button">
          Promote
        </button>
      );
    }
    return null;
  };

  // Function to render default indicator
  const renderDefaultIndicator = (isDefault?: boolean) => {
    if (isDefault) {
      return <span className="default-indicator"><FaStar /> default</span>;
    }
    return null;
  };

  // Render branch table
  const renderBranchTable = (branches: Branch[]) => {
    return (
      <div className="branch-table-container">
        <table className="version-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Edited</th>
              <th>Last Edited By</th>
              <th>Message</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr key={index}>
                <td>
                  {branch.name}
                  {renderDefaultIndicator(branch.isDefault)}
                </td>
                <td>{branch.lastEdited}</td>
                <td>{renderUserAvatar(branch.userInitials)}</td>
                <td>{branch.message}</td>
                <td>{renderStateBadge(branch.state)}</td>
                <td>{renderPromoteButton(branch.state)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Get unique branches
  const branches = getUniqueBranches();

  return (
    <div className="version-page">
      {/* Tab navigation */}
      <div className="version-tabs">
        <button 
          className={`tab-button ${activeTab === 'public' ? 'active' : ''}`}
          onClick={() => setActiveTab('public')}
        >
          Public
        </button>
        <button 
          className={`tab-button ${activeTab === 'drafts' ? 'active' : ''}`}
          onClick={() => setActiveTab('drafts')}
        >
          Drafts
        </button>
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button 
          className={`tab-button ${activeTab === 'tags' ? 'active' : ''}`}
          onClick={() => setActiveTab('tags')}
        >
          Tags
        </button>
        <button 
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === 'public' && (
          <div className="version-section">
            <h3>Public</h3>
            {renderBranchTable(publicBranches)}
          </div>
        )}

        {activeTab === 'drafts' && (
          <>
            <div className="version-section">
              <h3>Your Drafts</h3>
              {userDraftBranches.length > 0 ? (
                renderBranchTable(userDraftBranches)
              ) : (
                <p className="no-drafts-message">You don't have any draft branches.</p>
              )}
            </div>
            <div className="version-section">
              <h3>All Drafts</h3>
              {renderBranchTable(privateBranches)}
            </div>
          </>
        )}

        {activeTab === 'all' && (
          <div className="version-section">
            <h3>All Branches</h3>
            {renderBranchTable(allBranches)}
          </div>
        )}

        {activeTab === 'tags' && (
          <div className="version-section">
            <h3>Tagged Versions</h3>
            <ListView 
              versions={taggedVersions} 
              renderStateBadge={renderStateBadge}
              renderUserAvatar={renderUserAvatar}
            />
          </div>
        )}

        {activeTab === 'history' && (
          <>
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
                {/* Current version info */}
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

                {/* Version history */}
                <div className="version-section">
                  <h3>Version History</h3>
                  <ListView 
                    versions={versionHistory} 
                    renderStateBadge={renderStateBadge}
                    renderUserAvatar={renderUserAvatar}
                  />
                </div>

                {/* Component versions - only shown for system files */}
                {isSystemFile && (
                  <div className="version-section">
                    <h3>Component Versions</h3>
                    <ComponentVersions 
                      versions={versionHistory}
                      components={components}
                      getComponentVersionData={getComponentVersionData}
                      renderUserAvatar={renderUserAvatar}
                      componentColumnVisibility={{
                        tag: true,
                        date: true,
                        user: true,
                        message: true
                      }}
                      renderComponentColumnToggle={() => <></>}
                    />
                  </div>
                )}
              </>
            ) : (
              // Tree view
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
          </>
        )}
      </div>
    </div>
  );
};

export default VersionPage; 