import React from 'react';
import { FaTag, FaCalendarAlt, FaUser, FaComment } from 'react-icons/fa';
import { Version } from './types';

interface Component {
  id: string;
  name: string;
  type: string;
}

interface ComponentVersionData {
  componentId: string;
  tag: string;
  date: string;
  user: string;
  message: string;
}

interface ComponentVersionsProps {
  versions: Version[];
  components: Component[];
  componentColumnVisibility: {
    tag: boolean;
    date: boolean;
    user: boolean;
    message: boolean;
  };
  renderComponentColumnToggle: (
    column: keyof typeof componentColumnVisibility,
    label: string,
    icon: React.ReactNode
  ) => JSX.Element;
  getComponentVersionData: (systemVersionId: string, componentId: string) => ComponentVersionData | null;
  renderUserAvatar: (initials: string) => JSX.Element | null;
}

const ComponentVersions: React.FC<ComponentVersionsProps> = ({
  versions,
  components,
  componentColumnVisibility,
  renderComponentColumnToggle,
  getComponentVersionData,
  renderUserAvatar,
}) => {
  return (
    <div className="version-section">
      <h3>Component Versions</h3>
      
      {/* Component column visibility controls */}
      <div className="column-toggles component-toggles">
        <h4>Toggle Component Columns:</h4>
        <div className="toggle-buttons">
          {renderComponentColumnToggle('tag', 'Tag', <FaTag />)}
          {renderComponentColumnToggle('date', 'Date', <FaCalendarAlt />)}
          {renderComponentColumnToggle('user', 'User', <FaUser />)}
          {renderComponentColumnToggle('message', 'Message', <FaComment />)}
        </div>
      </div>
      
      <div className="component-versions-table-container">
        <table className="version-table component-table">
          <thead>
            <tr className="component-header-row">
              <th className="version-column">Version</th>
              {components.map(component => (
                <th key={component.id} colSpan={Object.values(componentColumnVisibility).filter(Boolean).length} className={`component-header ${component.type}`}>
                  <span className={`component-type ${component.type}`}>{component.type}</span>
                  {component.name}
                </th>
              ))}
            </tr>
            <tr className="subheader-row">
              <th></th> {/* Empty cell for version column */}
              {components.map(component => (
                <React.Fragment key={`subheader-${component.id}`}>
                  {componentColumnVisibility.tag && <th className="subheader">Tag</th>}
                  {componentColumnVisibility.date && <th className="subheader">Date</th>}
                  {componentColumnVisibility.user && <th className="subheader">User</th>}
                  {componentColumnVisibility.message && <th className="subheader">Message</th>}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {versions.map(version => (
              <tr key={`component-row-${version.id}`} className="component-row">
                <td className="version-cell">
                  <span className="version-tag">
                    <FaTag />
                    {version.id}
                  </span>
                </td>
                {components.map(component => {
                  const componentData = getComponentVersionData(version.id, component.id);
                  return (
                    <React.Fragment key={`${version.id}-${component.id}`}>
                      {componentColumnVisibility.tag && (
                        <td>
                          {componentData?.tag && (
                            <span className="version-tag">
                              <FaTag />
                              {componentData.tag}
                            </span>
                          )}
                        </td>
                      )}
                      {componentColumnVisibility.date && <td>{componentData?.date || '-'}</td>}
                      {componentColumnVisibility.user && <td>{componentData?.user ? renderUserAvatar(componentData.user) : '-'}</td>}
                      {componentColumnVisibility.message && <td>{componentData?.message || '-'}</td>}
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComponentVersions; 