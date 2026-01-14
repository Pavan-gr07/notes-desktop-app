import { app, BrowserWindow, ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'

const isDev = !app.isPackaged;
const DATA_PATH = path.join(app.getPath('userData'), 'app-data.json');

const readData = () => {
    if (!fs.existsSync(DATA_PATH)) return { notes: [], settings: { user: { name: "User" } } };
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

const saveData = (key: string, value: any) => {
    const data = readData();
    data[key] = value;
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false, // For your custom titlebar
        icon: path.join(__dirname, isDev ? '../public/icon.ico' : '../build/icon.ico'),
        webPreferences: {
            // IMPORTANT: Ensure this path points to your compiled preload.js
            preload: path.join(__dirname, "../preload/preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    if (isDev) {
        win.loadURL('http://localhost:5173');
    } else {
        win.loadFile(path.join(__dirname, '../renderer/index.html'));
    }
}


// Use .on for one-way messages like window controls
ipcMain.on("window:minimize", () => {
    BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.on("window:maximize", () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
        win.isMaximized() ? win.unmaximize() : win.maximize();
    }
});

ipcMain.on("window:close", () => {
    BrowserWindow.getFocusedWindow()?.close();
});

// IPC Handlers (Define these ONLY ONCE)
ipcMain.handle('notes:load', () => readData().notes);
ipcMain.handle('notes:save', (_, notes) => saveData('notes', notes));
ipcMain.handle('settings:get', () => readData().settings);
ipcMain.handle('settings:save', (_, settings) => saveData('settings', settings));

app.whenReady().then(createWindow);
