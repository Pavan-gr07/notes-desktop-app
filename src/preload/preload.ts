import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
    // Use any[] or a specific interface for notes
    loadNotes: () => ipcRenderer.invoke('notes:load'),
    saveNotes: (notes: any[]) => ipcRenderer.invoke('notes:save', notes),

    getSettings: () => ipcRenderer.invoke('settings:get'),
    // Add ': any' or a specific type to settings
    saveSettings: (settings: any) => ipcRenderer.invoke('settings:save', settings),

    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close')
})