import React from 'react';
import { FaTag } from 'react-icons/fa';
import { Version, VersionState, getCommitHash } from '../../../../data/versions';

interface ListViewProps {
  versions: Version[];
  renderStateBadge: (state: VersionState) => JSX.Element | null;
  renderUserAvatar: (initials: string) => JSX.Element | null;
}

const ListView: React.FC<ListViewProps> = ({
  versions,
  renderStateBadge,
  renderUserAvatar,
}) => {
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
    <div className="version-table-container">
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
          {versions.map((version) => (
            <tr key={version.id}>
              <td>
                {renderTags(version.tag)}
              </td>
              <td>
                <a href="#" className="commit-hash-link">
                  {getCommitHash(version.id)}
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
  );
};

export default ListView; 