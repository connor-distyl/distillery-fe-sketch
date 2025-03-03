import React from 'react';

interface EditTabProps {
  selectedFile: string;
}

const EditTab: React.FC<EditTabProps> = ({ selectedFile }) => {
  return (
    <div className="tab-content">
      <h3>Edit Mode</h3>
      <p>This is where you would edit the content of "{selectedFile}"</p>
    </div>
  );
};

export default EditTab; 