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