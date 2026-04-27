
export type UserRole = 'admin' | 'student' | null;

export interface Site {
  id: string;
  name: string;
  url: string;
  icon: string;
  type: 'educational' | 'tool' | 'other';
}

export interface AppSettings {
  isLocked: boolean;
  exitPassword?: string;
  whitelist: Site[];
  blacklist: string[]; // domains
  theme: 'light' | 'dark';
}

export const DEFAULT_SITES: Site[] = [
  {
    id: 'gyaan-portal',
    name: 'Gyaan Portal',
    url: 'https://www.google.com/search?q=educational+resources', // Example portal
    icon: 'Shield',
    type: 'educational',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/embed/videoseries?list=PLBlnK6fEyqRjK6fW0xGf_y65G_6Z70A6R', // Example playlist
    icon: 'Youtube',
    type: 'educational',
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    url: 'https://notebooklm.google.com/',
    icon: 'BookOpen',
    type: 'tool',
  },
];

export const DEFAULT_SETTINGS: AppSettings = {
  isLocked: true,
  exitPassword: 'admin',
  whitelist: DEFAULT_SITES,
  blacklist: ['facebook.com', 'instagram.com', 'twitter.com', 'tiktok.com', 'reddit.com'],
  theme: 'light',
};
