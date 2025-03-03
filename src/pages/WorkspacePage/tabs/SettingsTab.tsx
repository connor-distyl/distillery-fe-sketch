import React, { useState, useEffect } from 'react';
import './SettingsTab.css';

interface SettingsTabProps {
  selectedFile: string;
  onSettingsChange?: (fileId: string, isEdited: boolean) => void;
}

interface MetadataState {
  name: string;
  model: string;
  tools: string[];
  documents: string[];
  originalValues?: {
    name: string;
    model: string;
    tools: string[];
    documents: string[];
  };
}

// HeroUI Components
const HeroTextField: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ id, label, value, onChange, placeholder }) => {
  return (
    <div className="hero-field">
      <label htmlFor={id} className="hero-label">{label}</label>
      <input 
        type="text" 
        id={id} 
        className="hero-input"
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

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
      <select 
        id={id} 
        className="hero-select"
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const HeroMultiSelect: React.FC<{
  id: string;
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: { value: string; label: string }[];
  count?: number;
}> = ({ id, label, values, onChange, options, count }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    onChange(selectedOptions);
  };

  return (
    <div className="hero-field">
      <label htmlFor={id} className="hero-label">{label}</label>
      <div className="hero-multiselect-container">
        <select 
          id={id} 
          className="hero-multiselect"
          value={values} 
          onChange={handleChange}
          multiple
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {count !== undefined && <span className="hero-count">({count})</span>}
      </div>
    </div>
  );
};

const SettingsTab: React.FC<SettingsTabProps> = ({ selectedFile, onSettingsChange }) => {
  // Model options
  const modelOptions = [
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'claude-3-opus', label: 'Claude 3 Opus' },
    { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' }
  ];

  // Tool options
  const toolOptions = [
    { value: 'general_info_lookup', label: 'General Info Lookup' },
    { value: 'order_lookup', label: 'Order Lookup' },
    { value: 'customer_profile', label: 'Customer Profile' },
    { value: 'product_catalog', label: 'Product Catalog' },
    { value: 'knowledge_base', label: 'Knowledge Base' },
    { value: 'billing_system', label: 'Billing System' }
  ];

  // Document options
  const documentOptions = [
    { value: 'company_policies', label: 'Company Policies' },
    { value: 'product_manuals', label: 'Product Manuals' },
    { value: 'faq_database', label: 'FAQ Database' },
    { value: 'customer_service_scripts', label: 'Customer Service Scripts' },
    { value: 'troubleshooting_guides', label: 'Troubleshooting Guides' },
    { value: 'pricing_information', label: 'Pricing Information' },
    { value: 'return_policy', label: 'Return Policy' },
    { value: 'warranty_information', label: 'Warranty Information' },
    { value: 'shipping_guidelines', label: 'Shipping Guidelines' },
    { value: 'technical_specifications', label: 'Technical Specifications' }
  ];

  // Initial metadata values
  const initialMetadata: MetadataState = {
    name: selectedFile,
    model: 'gpt-4o',
    tools: ['general_info_lookup', 'order_lookup'],
    documents: documentOptions.slice(0, 5).map(doc => doc.value),
    originalValues: {
      name: selectedFile,
      model: 'gpt-4o',
      tools: ['general_info_lookup', 'order_lookup'],
      documents: documentOptions.slice(0, 5).map(doc => doc.value)
    }
  };

  const [metadata, setMetadata] = useState<MetadataState>(initialMetadata);
  const [isEdited, setIsEdited] = useState(false);

  // When the selected file changes, reset the metadata
  useEffect(() => {
    const newInitialMetadata = {
      ...initialMetadata,
      name: selectedFile,
      originalValues: {
        name: selectedFile,
        model: 'gpt-4o',
        tools: ['general_info_lookup', 'order_lookup'],
        documents: documentOptions.slice(0, 5).map(doc => doc.value)
      }
    };
    
    setMetadata(newInitialMetadata);
    setIsEdited(false);
    
    // Notify parent that this file is not edited
    if (onSettingsChange) {
      onSettingsChange(selectedFile, false);
    }
  }, [selectedFile]);

  const handleInputChange = (field: keyof MetadataState, value: string | string[]) => {
    const newMetadata = {
      ...metadata,
      [field]: value
    };
    
    setMetadata(newMetadata);
    
    // Check if any value is different from the original
    const hasChanges = 
      newMetadata.name !== (metadata.originalValues?.name || '') ||
      newMetadata.model !== (metadata.originalValues?.model || '') ||
      JSON.stringify(newMetadata.tools) !== JSON.stringify(metadata.originalValues?.tools || []) ||
      JSON.stringify(newMetadata.documents) !== JSON.stringify(metadata.originalValues?.documents || []);
    
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
        <HeroTextField
          id="name"
          label="Name:"
          value={metadata.name}
          onChange={(value) => handleInputChange('name', value)}
          placeholder="Enter name"
        />
        
        <HeroSelect
          id="model"
          label="Model:"
          value={metadata.model}
          onChange={(value) => handleInputChange('model', value)}
          options={modelOptions}
        />
        
        <HeroMultiSelect
          id="tools"
          label="Tools:"
          values={metadata.tools}
          onChange={(values) => handleInputChange('tools', values)}
          options={toolOptions}
          count={metadata.tools.length}
        />
        
        <HeroMultiSelect
          id="documents"
          label="Documents:"
          values={metadata.documents}
          onChange={(values) => handleInputChange('documents', values)}
          options={documentOptions}
          count={metadata.documents.length}
        />
      </div>
    </div>
  );
};

export default SettingsTab; 