import React from 'react';
import { FaTag } from 'react-icons/fa';
import { Version, VersionState } from './types';

interface ListViewProps {
  currentVersion: Version;
  versions: Version[];
  isSystemFile: boolean;
  renderStateBadge: (state: VersionState) => JSX.Element | null;
  renderUserAvatar: (initials: string) => JSX.Element | null;
}

const ListView: React.FC<ListViewProps> = ({
  currentVersion,
  versions,
  isSystemFile,
  renderStateBadge,
  renderUserAvatar,
}) => {
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

export default ListView; 