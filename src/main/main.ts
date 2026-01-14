import { ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'
import { app } from 'electron'

const DATA_PATH = path.join(app.getPath('userData'), 'app-data.json');

// Helper to read/write file
const readData = () => {
    if (!fs.existsSync(DATA_PATH)) return { notes: [], settings: { user: { name: "User" } } };
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

const saveData = (key: string, value: any) => {
    const data = readData();
    data[key] = value;
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// IPC Handlers
ipcMain.handle('notes:load', () => readData().notes);
ipcMain.handle('notes:save', (_, notes) => saveData('notes', notes));
ipcMain.handle('settings:get', () => readData().settings);
ipcMain.handle('settings:save', (_, settings) => saveData('settings', settings));