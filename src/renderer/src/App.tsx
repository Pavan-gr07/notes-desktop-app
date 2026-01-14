import { useState, useEffect } from "react";
import { TitleBar } from "./components/TitleBar";
import { ActivityBar } from "./components/ActivityBar";
import { SidePanel } from "./components/SidePanel";
import { Editor } from "./components/Editor";
import { SettingsView } from "./components/SettingsView";
import { Note, Module, UserProfile } from "./types";

export default function App() {
    const [activeModule, setActiveModule] = useState('notes');
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [user, setUser] = useState<UserProfile>({ name: "Admin", avatar: "" });

    // 1. Initial Load from "Database"
    useEffect(() => {
        async function init() {
            const savedNotes = await window.api.loadNotes();
            const settings = await window.api.getSettings();
            if (savedNotes) setNotes(savedNotes);
            if (settings?.user) setUser(settings.user);
        }
        init();
    }, []);

    // 2. CRUD Operations
    const handleCreate = async () => {
        const newNote: Note = {
            id: Date.now(),
            title: "Untitled Note",
            content: "",
            lastModified: Date.now() // FIX: Added this to satisfy the Interface
        };

        const updated = [newNote, ...notes];
        setNotes(updated);
        setActiveNote(newNote);
        await window.api.saveNotes(updated);
    };

    const handleUpdate = async (id: number, title: string, content: string) => {
        const updated = notes.map(n =>
            n.id === id ? { ...n, title, content, lastModified: Date.now() } : n
        );
        setNotes(updated);
        setActiveNote(updated.find(n => n.id === id) || null);
        await window.api.saveNotes(updated);
    };

    const handleDelete = async (id: Number) => {
        const updated = notes.filter(n => n.id !== id);
        setNotes(updated);
        setActiveNote(null);
        await window.api.saveNotes(updated);
    };

    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden font-sans">
            <TitleBar user={user} />

            <div className="flex flex-1 overflow-hidden">
                <ActivityBar active={activeModule} setActive={setActiveModule} />

                {activeModule === 'notes' && (
                    <SidePanel
                        notes={notes}
                        activeNote={activeNote}
                        onSelect={setActiveNote}
                        onNew={handleCreate}
                    />
                )}

                <main className="flex-1 bg-white relative">
                    {activeModule === 'notes' && (
                        <Editor
                            note={activeNote}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    )}
                    {activeModule === 'settings' && (
                        <SettingsView user={user} setUser={setUser} />
                    )}
                </main>
            </div>
        </div>
    );
}