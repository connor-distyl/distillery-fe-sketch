import React from 'react';
import { System } from '../../data/systems';
import './SystemSelector.css';

interface SystemSelectorProps {
  systems: System[];
  selectedSystemId: string | null;
  onSelectSystem: (systemId: string) => void;
}

const SystemSelector: React.FC<SystemSelectorProps> = ({ 
  systems, 
  selectedSystemId, 
  onSelectSystem 
}) => {
  return (
    <div className="system-selector">
      <h2>Select a System</h2>
      <div className="systems-list">
        {systems.map((system) => (
          <div 
            key={system.id}
            className={`system-card ${selectedSystemId === system.id ? 'selected' : ''}`}
            onClick={() => onSelectSystem(system.id)}
          >
            <div className="system-icon">{system.icon}</div>
            <div className="system-info">
              <h3>{system.name}</h3>
              <p>{system.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemSelector; 