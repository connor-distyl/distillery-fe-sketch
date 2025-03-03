import React from 'react';
import { FaTag, FaCheck, FaEye, FaEdit } from 'react-icons/fa';
import './VersionTab.css';

interface VersionTabProps {
  selectedFile: string;
}

// Version state types
type VersionState = 'Draft' | 'In Review' | 'Published';

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
}

const VersionTab: React.FC<VersionTabProps> = ({ selectedFile }) => {
  // Mock data for current version
  const currentVersion: Version = {
    id: 'v1.0',
    tag: 'latest',
    name: selectedFile,
    date: '2023-03-01',
    user: 'John Doe',
    userInitials: 'JD',
    message: 'Updated content structure',
    state: 'Published'
  };

  // Mock data for version history
  const versions: Version[] = [
    {
      id: 'v1.0',
      tag: 'latest',
      name: selectedFile,
      date: '2023-03-01',
      user: 'John Doe',
      userInitials: 'JD',
      message: 'Updated content structure',
      state: 'Published'
    },
    {
      id: 'v0.9',
      tag: 'stable',
      name: selectedFile,
      date: '2023-02-15',
      user: 'Jane Smith',
      userInitials: 'JS',
      message: 'Fixed formatting issues',
      state: 'In Review'
    },
    {
      id: 'v0.8',
      tag: '',
      name: selectedFile,
      date: '2023-02-10',
      user: 'Mike Johnson',
      userInitials: 'MJ',
      message: 'Initial draft',
      state: 'Draft'
    }
  ];

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
    return <div className="user-avatar">{initials}</div>;
  };

  return (
    <div className="version-tab">
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
    </div>
  );
};

export default VersionTab; 