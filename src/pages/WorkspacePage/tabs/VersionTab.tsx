import React from 'react';

interface VersionTabProps {
  selectedFile: string;
}

const VersionTab: React.FC<VersionTabProps> = ({ selectedFile }) => {
  return (
    <div className="tab-content">
      <h3>Version History</h3>
      <p>View and manage versions of "{selectedFile}"</p>
    </div>
  );
};

export default VersionTab; 