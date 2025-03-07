import React from 'react';
import { FaTag } from 'react-icons/fa';
import { Version, VersionState, getCommitHash } from '../../../../data/versions';

interface TreeViewProps {
  versions: Version[];
  renderStateBadge: (state: VersionState) => JSX.Element | null;
  renderUserAvatar: (initials: string) => JSX.Element | null;
  getBranchColor: (branch: string) => string;
  branches: string[];
}

const TreeView: React.FC<TreeViewProps> = ({
  versions,
  renderStateBadge,
  renderUserAvatar,
  getBranchColor,
  branches,
}) => {
  // Function to render tags as badges
  const renderTagBadges = (tagString: string) => {
    if (!tagString) return null;
    
    // Split the tag string by spaces to get individual tags
    const tags = tagString.split(' ');
    
    return (
      <>
        {tags.map((tag, index) => (
          <span key={index} className={`latest-tag ${index > 0 ? 'secondary-tag' : ''}`}>
            {tag}
          </span>
        ))}
      </>
    );
  };

  return (
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
                  <span>{getCommitHash(version.id)}</span>
                  {version.tag && renderTagBadges(version.tag)}
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
                            {/* Current version indicator removed as it's now shown separately */}
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
  );
};

export default TreeView; 