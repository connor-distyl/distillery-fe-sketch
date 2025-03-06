import React, { useState, useEffect } from 'react';
import './SettingsTab.css';

interface SimpleSettingsTabProps {
  selectedFile: string;
  onSettingsChange?: (fileId: string, isEdited: boolean) => void;
}

interface SimpleMetadataState {
  model: string;
  originalModel?: string;
}

// Reusable select component
const HeroSelect: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}> = ({ id, label, value, onChange, options }) => {
  return (
    <div className="hero-field">
      <label htmlFor={id} className="hero-label">{label}</label>
      <div className="hero-input-wrapper">
        <select 
          id={id} 
          className="hero-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const SimpleSettingsTab: React.FC<SimpleSettingsTabProps> = ({ selectedFile, onSettingsChange }) => {
  // Model options
  const modelOptions = [
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'claude-3-opus', label: 'Claude 3 Opus' },
    { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' }
  ];

  // Initial metadata values
  const initialMetadata: SimpleMetadataState = {
    model: 'gpt-4o',
    originalModel: 'gpt-4o'
  };

  const [metadata, setMetadata] = useState<SimpleMetadataState>(initialMetadata);
  const [isEdited, setIsEdited] = useState(false);

  // When the selected file changes, reset the metadata
  useEffect(() => {
    setMetadata(initialMetadata);
    setIsEdited(false);
    
    // Notify parent that this file is not edited
    if (onSettingsChange) {
      onSettingsChange(selectedFile, false);
    }
  }, [selectedFile]);

  const handleModelChange = (value: string) => {
    const newMetadata = {
      ...metadata,
      model: value
    };
    
    setMetadata(newMetadata);
    
    // Check if the model is different from the original
    const hasChanges = newMetadata.model !== metadata.originalModel;
    
    setIsEdited(hasChanges);
    
    // Notify parent component about the edit state
    if (onSettingsChange) {
      onSettingsChange(selectedFile, hasChanges);
    }
  };

  return (
    <div className="settings-tab">
      <div className="settings-form">
        <div className="settings-section">
          <div className="settings-fields">
            <HeroSelect
              id="model-select"
              label="Model"
              value={metadata.model}
              onChange={handleModelChange}
              options={modelOptions}
            />
          </div>
        </div>
        
        {isEdited && (
          <div className="settings-actions">
            <button 
              className="settings-button discard-button"
              onClick={() => {
                setMetadata(initialMetadata);
                setIsEdited(false);
                if (onSettingsChange) {
                  onSettingsChange(selectedFile, false);
                }
              }}
            >
              Discard Changes
            </button>
            <button 
              className="settings-button save-button"
              onClick={() => {
                // In a real app, you would save the changes to the server here
                const newInitialMetadata = {
                  model: metadata.model,
                  originalModel: metadata.model
                };
                setMetadata(newInitialMetadata);
                setIsEdited(false);
                if (onSettingsChange) {
                  onSettingsChange(selectedFile, false);
                }
              }}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleSettingsTab; 