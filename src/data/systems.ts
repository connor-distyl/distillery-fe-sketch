export interface System {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export const systems: System[] = [
  {
    id: 'genEditor',
    name: 'Gen Edit',
    description: 'AI-powered system editor',
    icon: '✏️'
  },
  {
    id: 'tower',
    name: 'Intelligent Bot',
    description: 'AI assistant for customer support and information retrieval.',
    icon: '🏢'
  },
  {
    id: 'caseEditor',
    name: 'Case Editor',
    description: 'AI-powered case editor',
    icon: '📋'
  }
];

export default systems; 