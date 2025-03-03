import React, { useState, useEffect } from 'react';
import './SettingsTab.css';

interface SettingsTabProps {
  selectedFile: string;
  onSettingsChange?: (fileId: string, isEdited: boolean) => void;
}

interface MetadataState {
  name: string;
  model: string;
  tools: string;
  documents: string;
  originalValues?: {
    name: string;
    model: string;
    tools: string;
    documents: string;
  };
}

const SettingsTab: React.FC<SettingsTabProps> = ({ selectedFile, onSettingsChange }) => {
  // Initial metadata values (in a real app, these would come from an API or store)
  const initialMetadata: MetadataState = {
    name: '',
    model: '',
    tools: '',
    documents: '',
    originalValues: {
      name: '',
      model: '',
      tools: '',
      documents: ''
    }
  };

  const [metadata, setMetadata] = useState<MetadataState>(initialMetadata);
  const [isEdited, setIsEdited] = useState(false);

  // When the selected file changes, reset the metadata
  useEffect(() => {
    // In a real app, you would fetch the metadata for the selected file here
    setMetadata(initialMetadata);
    setIsEdited(false);
    
    // Notify parent that this file is not edited
    if (onSettingsChange) {
      onSettingsChange(selectedFile, false);
    }
  }, [selectedFile]);

  const handleInputChange = (field: string, value: string) => {
    const newMetadata = {
      ...metadata,
      [field]: value
    };
    
    setMetadata(newMetadata);
    
    // Check if any value is different from the original
    const hasChanges = 
      newMetadata.name !== (metadata.originalValues?.name || '') ||
      newMetadata.model !== (metadata.originalValues?.model || '') ||
      newMetadata.tools !== (metadata.originalValues?.tools || '') ||
      newMetadata.documents !== (metadata.originalValues?.documents || '');
    
    setIsEdited(hasChanges);
    
    // Notify parent component about the edit state
    if (onSettingsChange) {
      console.log(`SettingsTab: Notifying parent that ${selectedFile} is ${hasChanges ? 'edited' : 'not edited'}`);
      onSettingsChange(selectedFile, hasChanges);
    }
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