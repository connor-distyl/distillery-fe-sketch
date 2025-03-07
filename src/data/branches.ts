import { VersionState } from './versions';

// Define the branch interface
export interface Branch {
  name: string;
  lastEdited: string;
  lastEditedBy: string;
  userInitials: string;
  message: string;
  state: VersionState;
  isDefault?: boolean;
  owner?: string;
}

// Public branches data
export const publicBranches: Branch[] = [
  { 
    name: 'Production', 
    lastEdited: '2025-03-25', 
    lastEditedBy: 'System Admin', 
    userInitials: 'SA',
    message: 'Latest production release', 
    state: 'Public',
    isDefault: true
  },
  { 
    name: 'R3.27', 
    lastEdited: '2025-03-20', 
    lastEditedBy: 'John Doe', 
    userInitials: 'JD',
    message: 'Release candidate for 3.27', 
    state: 'Public' 
  },
  { 
    name: 'R3.13', 
    lastEdited: '2025-03-15', 
    lastEditedBy: 'Jane Smith', 
    userInitials: 'JS',
    message: 'Hotfix for 3.13', 
    state: 'Public' 
  },
  { 
    name: 'R4.27', 
    lastEdited: '2025-03-10', 
    lastEditedBy: 'Mike Johnson', 
    userInitials: 'MJ',
    message: 'Early development for 4.27', 
    state: 'In Review' 
  }
];

// Private branches data
export const privateBranches: Branch[] = [
  { 
    name: 'R3.27/20250322-Genedit-01', 
    lastEdited: '2025-03-22', 
    lastEditedBy: 'Gene Smith', 
    userInitials: 'GS',
    message: 'Gene editing feature implementation', 
    state: 'Draft',
    owner: 'Gene Smith'
  },
  { 
    name: 'R3.27/20250322-James-1', 
    lastEdited: '2025-03-22', 
    lastEditedBy: 'James Wilson', 
    userInitials: 'JW',
    message: 'UI improvements for dashboard', 
    state: 'Draft',
    owner: 'James Wilson'
  },
  { 
    name: 'R3.313/20250320-Genedit-02', 
    lastEdited: '2025-03-20', 
    lastEditedBy: 'Gene Smith', 
    userInitials: 'GS',
    message: 'Bug fixes for gene editing', 
    state: 'Draft',
    owner: 'Gene Smith'
  },
  { 
    name: 'R4.27/20250318-James-2', 
    lastEdited: '2025-03-18', 
    lastEditedBy: 'James Wilson', 
    userInitials: 'JW',
    message: 'New feature exploration', 
    state: 'Draft',
    owner: 'James Wilson'
  },
  { 
    name: 'R3.27/20250317-Sarah-1', 
    lastEdited: '2025-03-17', 
    lastEditedBy: 'Sarah Johnson', 
    userInitials: 'SJ',
    message: 'Performance optimizations', 
    state: 'Draft',
    owner: 'Sarah Johnson'
  },
  { 
    name: 'R3.313/20250315-Michael-1', 
    lastEdited: '2025-03-15', 
    lastEditedBy: 'Michael Brown', 
    userInitials: 'MB',
    message: 'Security enhancements', 
    state: 'Draft',
    owner: 'Michael Brown'
  }
];

// Historical branches data
export const historicalBranches: Branch[] = [
  { 
    name: 'R3.26', 
    lastEdited: '2025-02-15', 
    lastEditedBy: 'System Admin', 
    userInitials: 'SA',
    message: 'Previous release version', 
    state: 'Public' 
  },
  { 
    name: 'R3.25', 
    lastEdited: '2025-01-20', 
    lastEditedBy: 'System Admin', 
    userInitials: 'SA',
    message: 'Stable release', 
    state: 'Public' 
  }
];

// Get all branches
export const getAllBranches = (): Branch[] => {
  return [...publicBranches, ...privateBranches, ...historicalBranches];
};

// Get user's draft branches
export const getUserDraftBranches = (username: string): Branch[] => {
  return privateBranches.filter(branch => branch.owner === username);
};

// Get branch by name
export const getBranchByName = (branchName: string): Branch | undefined => {
  return getAllBranches().find(branch => branch.name === branchName);
};

// Get default branch
export const getDefaultBranch = (): Branch | undefined => {
  return publicBranches.find(branch => branch.isDefault);
}; 