import React from 'react';
import { FaTag, FaCheck, FaEye, FaEdit } from 'react-icons/fa';
import { 
  Version, 
  VersionState, 
  versionHistory,
  getCurrentVersion
} from '../../../../data/versions';
import '../VersionTab.css';

interface VersionTabProps {
  selectedFile: string;
  onSelectFile?: (fileName: string) => void;
}

const VersionTab: React.FC<VersionTabProps> = ({ selectedFile, onSelectFile }) => {
  // Get current version for the selected file
  const currentVersion = getCurrentVersion(selectedFile);

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

  return (
    <div className="version-tab">
      {/* Linear version history */}
      <div className="version-section">
        <h3>Version History</h3>
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
            {versionHistory.map((version, index) => (
              <tr 
                key={version.id} 
                className={version.id === currentVersion.id ? 'current-version-row' : ''}
              >
                <td>
                  {renderTags(version.tag)}
                  {version.id === currentVersion.id && (
                    <span className="current-version-indicator">Current</span>
                  )}
                </td>
                <td>
                  <a href="#" className="commit-hash-link">
                    {version.commitHash}
                  </a>
                </td>
                <td>{version.date}</td>
                <td>{renderUserAvatar(version.userInitials)}</td>
                <td>{version.message}</td>
                <td>{renderStateBadge(version.state)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VersionTab; 