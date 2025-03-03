// Version state types
export type VersionState = 'Draft' | 'In Review' | 'Published';

// View mode type
export type ViewMode = 'list' | 'tree';

// Interface for version data
export interface Version {
  id: string;
  tag: string;
  name: string;
  date: string;
  user: string;
  userInitials: string;
  message: string;
  state: VersionState;
  parentId?: string; // Parent version ID for tree view
  branch?: string; // Branch name for tree view
}

// Interface for component data
export interface Component {
  id: string;
  name: string;
  type: string;
}

// Interface for component version data
export interface ComponentVersionData {
  componentId: string;
  tag: string;
  date: string;
  user: string;
  message: string;
}

// Interface for component column visibility
export interface ComponentColumnVisibility {
  tag: boolean;
  date: boolean;
  user: boolean;
  message: boolean;
}

// Utility function to generate a commit hash from a version ID
export const getCommitHash = (versionId: string): string => {
  // Create a deterministic hash-like string based on the version ID
  const baseHash = versionId.replace(/\D/g, '');
  return `${baseHash}a7e8f9c0d1b2e3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5`.substring(0, 8);
}; 