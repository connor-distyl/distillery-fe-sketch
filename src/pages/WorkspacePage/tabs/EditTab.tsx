import React from 'react';

interface EditTabProps {
  selectedFile: string;
}

const EditTab: React.FC<EditTabProps> = ({ selectedFile }) => {
  return (
    <div className="tab-content">
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        padding: '20px'
      }}>
        <img 
          src="/workflow-diagram.png" 
          alt="Workflow Diagram" 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '80vh',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px'
          }} 
        />
      </div>
    </div>
  );
};

export default EditTab; 