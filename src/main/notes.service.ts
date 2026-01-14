import fs from "fs";
import path from "path";
import { app } from "electron";

const NOTES_PATH = path.join(app.getPath("userData"), "notes.json");

export function loadNotes(): string[] {
    if (!fs.existsSync(NOTES_PATH)) {
        fs.writeFileSync(NOTES_PATH, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(NOTES_PATH, "utf-8"));
}

export function saveNotes(notes: string[]) {
    fs.writeFileSync(NOTES_PATH, JSON.stringify(notes, null, 2));
}
