export type Module = 'notes' | 'calendar' | 'files' | 'settings' | 'activity' | 'chat' | 'calls';

export interface Note {
    id: number;
    title: string;
    content: string;
    lastModified: number; // The missing property
}

export interface UserProfile {
    name: string;
    avatar: string;
}

