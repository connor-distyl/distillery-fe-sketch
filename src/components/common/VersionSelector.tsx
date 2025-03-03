import React, { useState } from 'react';
import { FaTag, FaCodeBranch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Version, getLatestVersion, versionHistory } from '../../data/versions';
import './VersionSelector.css';

interface VersionSelectorProps {
  onVersionSelect?: (version: Version) => void;
  onViewAllClick?: () => void;
}

const VersionSelector: React.FC<VersionSelectorProps> = ({ onVersionSelect, onViewAllClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tags' | 'versions'>('tags');
  const [selectedVersion, setSelectedVersion] = useState<Version>(getLatestVersion());
  const [showAllVersions, setShowAllVersions] = useState(false);

  // Use versionHistory for both tabs
  const displayVersions = showAllVersions ? versionHistory : versionHistory.slice(0, 5);
  
  // Filter versions with tags for the tags tab
  const tagsVersions = displayVersions.filter(version => version.tag && version.tag.trim() !== '');

  const handleVersionSelect = (version: Version) => {
    setSelectedVersion(version);
    setIsOpen(false);
    if (onVersionSelect) {
      onVersionSelect(version);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else {
      setShowAllVersions(true);
    }
  };

  // Helper function to render commit hash with tag
  const renderCommitWithTag = (version: Version) => {
    return (
      <>
        <span className="commit-hash">{version.commitHash || 'No hash'}</span>
        {version.tag && <span className="version-tag-label">{version.tag}</span>}
      </>
    );
  };

  return (
    <div className="version-selector">
      <button className="version-selector-button" onClick={toggleDropdown}>
        {activeTab === 'tags' ? <FaTag className="icon" /> : <FaCodeBranch className="icon" />}
        <span className="version-text">
          {activeTab === 'tags' 
            ? selectedVersion.tag 
            : (
              <>
                <span className="commit-hash">{selectedVersion.commitHash || 'No hash'}</span>
                {selectedVersion.tag && <span className="version-tag-label-small">{selectedVersion.tag}</span>}
              </>
            )}
        </span>
        {isOpen ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
      </button>

      {isOpen && (
        <div className="version-dropdown">
          <div className="version-tabs">
            <button 
              className={`tab-button ${activeTab === 'tags' ? 'active' : ''}`}
              onClick={() => setActiveTab('tags')}
            >
              Tags
            </button>
            <button 
              className={`tab-button ${activeTab === 'versions' ? 'active' : ''}`}
              onClick={() => setActiveTab('versions')}
            >
              Versions
            </button>
          </div>

          <div className="version-list">
            {activeTab === 'tags' ? (
              // Display only versions with tags
              tagsVersions.length > 0 ? (
                tagsVersions.map((version) => (
                  <div 
                    key={version.id} 
                    className={`version-item ${selectedVersion.id === version.id ? 'selected' : ''}`}
                    onClick={() => handleVersionSelect(version)}
                  >
                    <FaTag className="version-icon" />
                    <div className="version-info">
                      <div className="version-tag">{version.tag}</div>
                      <div className="version-message">{version.message}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-versions-message">No tagged versions available</div>
              )
            ) : (
              // Display all versions with commit hash first
              displayVersions.map((version) => (
                <div 
                  key={version.id} 
                  className={`version-item ${selectedVersion.id === version.id ? 'selected' : ''}`}
                  onClick={() => handleVersionSelect(version)}
                >
                  <FaCodeBranch className="version-icon" />
                  <div className="version-info">
                    <div className="version-hash-tag">
                      {renderCommitWithTag(version)}
                    </div>
                    <div className="version-message">{version.message}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Always show the View All button */}
          {!showAllVersions && (
            <button 
              className="view-all-button"
              onClick={handleViewAllClick}
            >
              View all
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VersionSelector; 