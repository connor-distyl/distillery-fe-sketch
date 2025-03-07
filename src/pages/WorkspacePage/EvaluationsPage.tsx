import React from 'react';
import { FaClipboardCheck } from 'react-icons/fa';
import './EvaluationsPage.css';

interface EvaluationsPageProps {
  selectedFile: string;
  onSelectFile?: (fileName: string) => void;
}

const EvaluationsPage: React.FC<EvaluationsPageProps> = ({ selectedFile, onSelectFile }) => {
  return (
    <div className="evaluations-page">
      <div className="evaluations-content">
        <div className="section-container">
          <h2 className="section-title">Test Runs</h2>
          <div className="evaluations-section">
            <div className="evaluations-table-header">
              <div className="header-row">
                <div className="header-cell">System Version</div>
              </div>
            </div>
            <div className="evaluations-table-body">
              <div className="no-results">No results found.</div>
            </div>
          </div>
        </div>

        <div className="section-container">
          <h2 className="section-title">Test Suites</h2>
          <div className="evaluations-section">
            <div className="evaluations-table-header">
              <div className="header-row">
                <div className="header-cell">System Version</div>
              </div>
            </div>
            <div className="evaluations-table-body">
              <div className="no-results">No results found.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationsPage; 