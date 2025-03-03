// Define types for version data
export type VersionState = 'Draft' | 'In Review' | 'Published';

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
}

// Sample version data
export const versions: Version[] = [
  {
    id: 'v10',
    tag: 'tower@1.1.0',
    name: 'Version 1.1.0',
    date: '2023-11-15',
    user: 'John Doe',
    userInitials: 'JD',
    message: 'Major feature release',
    state: 'Published'
  },
  {
    id: 'v9',
    tag: 'tower@1.0.6',
    name: 'Version 1.0.6',
    date: '2023-10-20',
    user: 'Jane Smith',
    userInitials: 'JS',
    message: 'Bug fixes and performance improvements',
    state: 'Published'
  },
  {
    id: 'v8',
    tag: 'tower@1.0.5',
    name: 'Version 1.0.5',
    date: '2023-09-05',
    user: 'Alex Johnson',
    userInitials: 'AJ',
    message: 'Minor updates',
    state: 'Published'
  },
  {
    id: 'v7',
    tag: 'tower@1.0.4',
    name: 'Version 1.0.4',
    date: '2023-08-12',
    user: 'Sarah Williams',
    userInitials: 'SW',
    message: 'Stability improvements',
    state: 'Published'
  },
  {
    id: 'v6',
    tag: 'tower@1.0.3',
    name: 'Version 1.0.3',
    date: '2023-07-28',
    user: 'Mike Brown',
    userInitials: 'MB',
    message: 'UI enhancements',
    state: 'Published'
  },
  {
    id: 'v5',
    tag: 'tower@1.0.1',
    name: 'Version 1.0.1',
    date: '2023-06-15',
    user: 'Emily Davis',
    userInitials: 'ED',
    message: 'Hotfix for critical issue',
    state: 'Published'
  },
  {
    id: 'v4',
    tag: 'tower@1.0.0',
    name: 'Version 1.0.0',
    date: '2023-06-01',
    user: 'Chris Wilson',
    userInitials: 'CW',
    message: 'Initial stable release',
    state: 'Published'
  },
  {
    id: 'v3',
    tag: 'tower@0.0.0',
    name: 'Version 0.0.0',
    date: '2023-05-10',
    user: 'David Miller',
    userInitials: 'DM',
    message: 'Beta release',
    state: 'Published'
  },
  {
    id: 'v2',
    tag: 'towerinfobot@0.0.0',
    name: 'Tower Info Bot 0.0.0',
    date: '2023-04-20',
    user: 'Lisa Taylor',
    userInitials: 'LT',
    message: 'Initial info bot implementation',
    state: 'Published'
  },
  {
    id: 'v1',
    tag: 'unstructured-indexing@0.0.0',
    name: 'Unstructured Indexing 0.0.0',
    date: '2023-03-15',
    user: 'Robert Garcia',
    userInitials: 'RG',
    message: 'Indexing functionality',
    state: 'Published'
  }
];

// Utility function to get the latest version
export const getLatestVersion = (): Version => {
  return versions[0];
}; 