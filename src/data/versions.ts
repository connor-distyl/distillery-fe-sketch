// Define types for version data
export type VersionState = 'Draft' | 'In Review' | 'Published';

// View mode type
export type ViewMode = 'list' | 'tree';

export interface Version {
  id: string;
  tag: string;
  name: string;
  date: string;
  user: string;
  userInitials: string;
  message: string;
  state: VersionState;
  parentId?: string;
  branch?: string;
  commitHash?: string;
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

// File explorer item type (migrated from FileExplorerPanel)
export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'system' | 'routine' | 'prompt' | 'tool' | 'guardrail' | 'code';
  expanded?: boolean;
  children?: FileItem[];
}

// Sample version data for the version selector
export const versions: Version[] = [
  {
    id: 'v10',
    tag: 'tower@1.1.0',
    name: 'Version 1.1.0',
    date: '2023-11-15',
    user: 'John Doe',
    userInitials: 'JD',
    message: 'Major feature release',
    state: 'Published',
    commitHash: '10a7e8f9'
  },
  {
    id: 'v9',
    tag: 'tower@1.0.6',
    name: 'Version 1.0.6',
    date: '2023-10-20',
    user: 'Jane Smith',
    userInitials: 'JS',
    message: 'Bug fixes and performance improvements',
    state: 'Published',
    commitHash: '9c0d1b2e'
  },
  {
    id: 'v8',
    tag: 'tower@1.0.5',
    name: 'Version 1.0.5',
    date: '2023-09-05',
    user: 'Alex Johnson',
    userInitials: 'AJ',
    message: 'Minor updates',
    state: 'Published',
    commitHash: '8a4b5c6d'
  },
  {
    id: 'v7',
    tag: 'tower@1.0.4',
    name: 'Version 1.0.4',
    date: '2023-08-12',
    user: 'Sarah Williams',
    userInitials: 'SW',
    message: 'Stability improvements',
    state: 'Published',
    commitHash: '7e8f9a0b'
  },
  {
    id: 'v6',
    tag: 'tower@1.0.3',
    name: 'Version 1.0.3',
    date: '2023-07-28',
    user: 'Mike Brown',
    userInitials: 'MB',
    message: 'UI enhancements',
    state: 'Published',
    commitHash: '6c2d3e4f'
  },
  {
    id: 'v5',
    tag: 'tower@1.0.1',
    name: 'Version 1.0.1',
    date: '2023-06-15',
    user: 'Emily Davis',
    userInitials: 'ED',
    message: 'Hotfix for critical issue',
    state: 'Published',
    commitHash: '5a6b7c8d'
  },
  {
    id: 'v4',
    tag: 'tower@1.0.0',
    name: 'Version 1.0.0',
    date: '2023-06-01',
    user: 'Chris Wilson',
    userInitials: 'CW',
    message: 'Initial stable release',
    state: 'Published',
    commitHash: '4e0f1a2b'
  },
  {
    id: 'v3',
    tag: 'tower@0.0.0',
    name: 'Version 0.0.0',
    date: '2023-05-10',
    user: 'David Miller',
    userInitials: 'DM',
    message: 'Beta release',
    state: 'Published',
    commitHash: '3c4d5e6f'
  },
  {
    id: 'v2',
    tag: 'towerinfobot@0.0.0',
    name: 'Tower Info Bot 0.0.0',
    date: '2023-04-20',
    user: 'Lisa Taylor',
    userInitials: 'LT',
    message: 'Initial info bot implementation',
    state: 'Published',
    commitHash: '2a8b9c0d'
  },
  {
    id: 'v1',
    tag: 'unstructured-indexing@0.0.0',
    name: 'Unstructured Indexing 0.0.0',
    date: '2023-03-15',
    user: 'Robert Garcia',
    userInitials: 'RG',
    message: 'Indexing functionality',
    state: 'Published',
    commitHash: '1e2f3a4b'
  }
];

// Version history data with parent relationships for VersionTab
export const versionHistory: Version[] = [
  {
    id: 'v1.0.0',
    tag: 'latest R3.27-1.0.0',
    name: 'Tower Bot',
    date: '2023-03-01',
    user: 'John Doe',
    userInitials: 'JD',
    message: 'Updated content structure',
    state: 'Published',
    parentId: 'v0.9.0',
    branch: 'main',
    commitHash: 'a7e8f9c0'
  },
  {
    id: 'v0.9.0',
    tag: 'R3.27-0.9.1',
    name: 'Tower Bot',
    date: '2023-02-15',
    user: 'Jane Smith',
    userInitials: 'JS',
    message: 'Fixed formatting issues',
    state: 'In Review',
    parentId: 'v0.8.0',
    branch: 'main',
    commitHash: 'd1b2e3a4'
  },
  {
    id: 'v0.8.0',
    tag: '',
    name: 'Tower Bot',
    date: '2023-02-10',
    user: 'Mike Johnson',
    userInitials: 'MJ',
    message: 'Initial draft',
    state: 'Draft',
    parentId: 'v0.7.0',
    branch: 'main',
    commitHash: 'b5c6d7e8'
  },
  {
    id: 'v0.7.0',
    tag: 'R3.27-0.9.0',
    name: 'Tower Bot',
    date: '2023-02-05',
    user: 'John Doe',
    userInitials: 'JD',
    message: 'Setup basic structure',
    state: 'Published',
    branch: 'main',
    commitHash: 'f9a0b1c2'
  },
  {
    id: 'v0.6.0',
    tag: '',
    name: 'Tower Bot',
    date: '2023-02-01',
    user: 'Jane Smith',
    userInitials: 'JS',
    message: 'Feature implementation',
    state: 'Draft',
    parentId: 'v0.4.0',
    branch: 'feature/new-ui',
    commitHash: 'd3e4f5a6'
  },
  {
    id: 'v0.5.0',
    tag: '',
    name: 'Tower Bot',
    date: '2023-01-28',
    user: 'Mike Johnson',
    userInitials: 'MJ',
    message: 'Bug fix implementation',
    state: 'Draft',
    parentId: 'v0.4.0',
    branch: 'fix/bug-123',
    commitHash: 'b7c8d9e0'
  },
  {
    id: 'v0.4.0',
    tag: '',
    name: 'Tower Bot',
    date: '2023-01-25',
    user: 'John Doe',
    userInitials: 'JD',
    message: 'Initial implementation',
    state: 'Draft',
    branch: 'main',
    commitHash: 'f1a2b3c4'
  }
];

// Define components for the system
export const components: Component[] = [
  { id: 'c1', name: 'Routines/Order', type: 'routine' },
  { id: 'c2', name: 'Routines/Gen Info', type: 'routine' },
  { id: 'c3', name: 'Prompts/Shared', type: 'prompt' },
  { id: 'c4', name: 'Prompts/Tone', type: 'prompt' },
  { id: 'c5', name: 'Tools/Device lookup', type: 'tool' },
  { id: 'c6', name: 'Guardrails', type: 'guardrail' },
  { id: 'c7', name: 'Code', type: 'code' }
];

// Mock data for component versions by system version
export const componentVersionsBySystemVersion: Record<string, ComponentVersionData[]> = {
  'v1.0.0': [
    { componentId: 'c1', tag: 'v2.3.13.02', date: '2023-03-01', user: 'JD', message: 'Updated order flow' },
    { componentId: 'c2', tag: 'v2.3.13.01', date: '2023-02-28', user: 'JS', message: 'Fixed information retrieval' },
    { componentId: 'c3', tag: 'v2.3.9.02', date: '2023-02-25', user: 'MJ', message: 'Updated shared prompts' },
    { componentId: 'c4', tag: 'v2.3.9.01', date: '2023-02-20', user: 'SL', message: 'Improved tone consistency' },
    { componentId: 'c5', tag: 'v2.3.7.03', date: '2023-02-18', user: 'JD', message: 'Enhanced device detection' },
    { componentId: 'c6', tag: 'v2.3.5.01', date: '2023-02-15', user: 'JS', message: 'Updated safety protocols' },
    { componentId: 'c7', tag: 'v2.3.4.02', date: '2023-02-10', user: 'MJ', message: 'Optimized performance' }
  ],
  'v0.9.0': [
    { componentId: 'c1', tag: 'v2.3.9.02', date: '2023-02-14', user: 'JS', message: 'Fixed order validation' },
    { componentId: 'c2', tag: 'v2.3.9.01', date: '2023-02-12', user: 'MJ', message: 'Added new info fields' },
    { componentId: 'c3', tag: 'v2.3.7.01', date: '2023-02-10', user: 'JD', message: 'Refactored prompts' },
    { componentId: 'c4', tag: 'v2.3.7.01', date: '2023-02-10', user: 'JD', message: 'Refactored prompts' },
    { componentId: 'c5', tag: 'v2.3.5.02', date: '2023-02-08', user: 'SL', message: 'Added new devices' },
    { componentId: 'c6', tag: 'v2.3.4.01', date: '2023-02-05', user: 'JS', message: 'Initial guardrails' },
    { componentId: 'c7', tag: 'v2.3.2.01', date: '2023-02-01', user: 'MJ', message: 'Initial code setup' }
  ],
  'v0.8.0': [
    { componentId: 'c1', tag: 'v2.3.5.01', date: '2023-02-08', user: 'MJ', message: 'Initial order flow' },
    { componentId: 'c2', tag: 'v2.3.5.01', date: '2023-02-08', user: 'MJ', message: 'Initial info structure' },
    { componentId: 'c3', tag: 'v2.3.4.01', date: '2023-02-05', user: 'JD', message: 'Basic prompts' },
    { componentId: 'c4', tag: 'v2.3.4.01', date: '2023-02-05', user: 'JD', message: 'Basic prompts' },
    { componentId: 'c5', tag: 'v2.3.2.01', date: '2023-02-01', user: 'JS', message: 'Basic device lookup' },
    { componentId: 'c6', tag: '', date: '', user: '', message: 'Not implemented' },
    { componentId: 'c7', tag: '', date: '', user: '', message: 'Not implemented' }
  ]
};

// File structure data migrated from FileExplorerPanel
export const fileStructure: FileItem[] = [
  {
    id: '2',
    name: 'System',
    type: 'system'
  },
  {
    id: '3',
    name: 'Routines',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: '4',
        name: 'Order',
        type: 'routine'
      },
      {
        id: '5',
        name: 'Gen Info',
        type: 'routine'
      }
    ]
  },
  {
    id: '8',
    name: 'Prompts',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: '7',
        name: 'Shared',
        type: 'prompt'
      },
      {
        id: '9',
        name: 'Tone',
        type: 'prompt'
      }
    ]
  },
  {
    id: '10',
    name: 'Tools',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: '11',
        name: 'Device lookup',
        type: 'tool'
      },
      {
        id: '12',
        name: 'Gen Info (Tool)',
        type: 'tool'
      }
    ]
  },
  {
    id: '13',
    name: 'Guardrails',
    type: 'guardrail'
  },
  {
    id: '14',
    name: 'Code',
    type: 'code'
  }
];

// Utility function to get the latest version
export const getLatestVersion = (): Version => {
  return versions[0];
};

// Utility function to get the current version for a specific file
export const getCurrentVersion = (fileName: string): Version => {
  const fileVersion = versionHistory.find(v => v.name === fileName && v.state === 'Published');
  return fileVersion || versionHistory[0];
};

// Utility function to generate a commit hash from a version ID
export const getCommitHash = (versionId: string): string => {
  // If the version already has a commit hash, return it
  const version = [...versions, ...versionHistory].find(v => v.id === versionId);
  if (version && version.commitHash) {
    return version.commitHash;
  }
  
  // Otherwise create a deterministic hash-like string based on the version ID
  const baseHash = versionId.replace(/\D/g, '');
  return `${baseHash}a7e8f9c0d1b2e3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5`.substring(0, 8);
};

// Function to get unique branches from versions
export const getUniqueBranches = (): string[] => {
  const branches = new Set<string>();
  versionHistory.forEach(version => {
    if (version.branch) {
      branches.add(version.branch);
    }
  });
  return Array.from(branches);
};

// Function to get branch color
export const getBranchColor = (branch: string): string => {
  const colors = ['#4a6bdf', '#9c27b0', '#2196f3', '#009688', '#ff5722'];
  const branches = getUniqueBranches();
  const index = branches.indexOf(branch) % colors.length;
  return colors[index];
}; 