import React, { useState } from 'react';
import './SettingsTab.css';

interface SettingsTabProps {
  selectedFile: string;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ selectedFile }) => {
  const [metadata, setMetadata] = useState({
    name: '',
    model: '',
    tools: '',
    documents: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setMetadata({
      ...metadata,
      [field]: value
    });
  };

  return (
    <div className="tab-content settings-tab">
      <h3>Metadata for "{selectedFile}"</h3>
      
      <div className="metadata-form">
        <div className="metadata-field">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={metadata.name} 
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter name"
          />
        </div>
        
        <div className="metadata-field">
          <label htmlFor="model">Model:</label>
          <select 
            id="model" 
            value={metadata.model} 
            onChange={(e) => handleInputChange('model', e.target.value)}
          >
            <option value="">Select a model</option>
            <option value="model1">Model 1</option>
            <option value="model2">Model 2</option>
            <option value="model3">Model 3</option>
          </select>
        </div>
        
        <div className="metadata-field">
          <label htmlFor="tools">Tools:</label>
          <select 
            id="tools" 
            value={metadata.tools} 
            onChange={(e) => handleInputChange('tools', e.target.value)}
          >
            <option value="">Select tools</option>
            <option value="tool1">Tool 1</option>
            <option value="tool2">Tool 2</option>
            <option value="tool3">Tool 3</option>
          </select>
        </div>
        
        <div className="metadata-field">
          <label htmlFor="documents">Documents:</label>
          <select 
            id="documents" 
            value={metadata.documents} 
            onChange={(e) => handleInputChange('documents', e.target.value)}
          >
            <option value="">Select documents</option>
            <option value="doc1">Document 1</option>
            <option value="doc2">Document 2</option>
          </select>
          <span className="document-count">(2)</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab; 