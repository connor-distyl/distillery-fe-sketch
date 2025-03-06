import React, { useState, useRef, useEffect } from 'react';
import { FaTag, FaCodeBranch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Version, getLatestVersion, versionHistory } from '../../data/versions';
import './VersionSelector.css';

interface VersionSelectorProps {
  onVersionSelect?: (version: Version) => void;
  onViewAllClick?: () => void;
  hasUnsavedChanges?: boolean;
}

const VersionSelector: React.FC<VersionSelectorProps> = ({ onVersionSelect, onViewAllClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tags' | 'versions'>('tags');
  const [selectedVersion, setSelectedVersion] = useState<Version>(getLatestVersion());
  const [showAllVersions, setShowAllVersions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use versionHistory for both tabs
  const displayVersions = showAllVersions ? versionHistory : versionHistory.slice(0, 5);
  
  // Filter versions with tags for the tags tab
  const tagsVersions = displayVersions.filter(version => version.tag && version.tag.trim() !== '');

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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
    setIsOpen(false);
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
    <div className="version-selector" ref={dropdownRef}>
      <button className="version-selector-button" onClick={toggleDropdown}>
        <FaTag className="icon" />
        <span className="version-text">
          {selectedVersion.tag || 'Latest Version'}
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
          <button 
            className="view-all-button"
            onClick={handleViewAllClick}
          >
            {showAllVersions ? 'View version history' : 'View all'}
          </button>
        </div>
      )}
    </div>
  );
};

export default VersionSelector; 