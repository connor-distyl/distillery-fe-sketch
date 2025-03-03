import React, { useState } from 'react';
import { FaTag, FaCodeBranch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { versions, Version, getLatestVersion } from '../../data/versions';
import './VersionSelector.css';

interface VersionSelectorProps {
  onVersionSelect?: (version: Version) => void;
}

const VersionSelector: React.FC<VersionSelectorProps> = ({ onVersionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tags' | 'branches'>('tags');
  const [selectedVersion, setSelectedVersion] = useState<Version>(getLatestVersion());
  const [showAllVersions, setShowAllVersions] = useState(false);

  // Display only the first 5 versions unless showAllVersions is true
  const displayVersions = showAllVersions ? versions : versions.slice(0, 5);

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

  return (
    <div className="version-selector">
      <button className="version-selector-button" onClick={toggleDropdown}>
        {activeTab === 'tags' ? <FaTag className="icon" /> : <FaCodeBranch className="icon" />}
        <span className="version-text">{selectedVersion.tag}</span>
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
              className={`tab-button ${activeTab === 'branches' ? 'active' : ''}`}
              onClick={() => setActiveTab('branches')}
            >
              Branches
            </button>
          </div>

          <div className="version-list">
            {displayVersions.map((version) => (
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
            ))}
          </div>

          {!showAllVersions && versions.length > 5 && (
            <button 
              className="view-all-button"
              onClick={() => setShowAllVersions(true)}
            >
              View all tags
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VersionSelector; 