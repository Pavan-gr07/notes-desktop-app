export interface IElectronAPI {
    loadNotes: () => Promise<any[]>;
    saveNotes: (notes: any[]) => Promise<void>;
    getSettings: () => Promise<any>;
    saveSettings: (settings: any) => Promise<void>;
    minimize: () => void;
    maximize: () => void;
    close: () => void;
}

declare global {
    interface Window {
        api: IElectronAPI;
    }
}