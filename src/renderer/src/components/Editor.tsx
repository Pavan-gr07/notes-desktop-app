import { Save, Trash2, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Note {
    id: number;
    title: string;
    content: string;
}

interface EditorProps {
    note: Note | null;
    onUpdate: (id: number, title: string, content: string) => void;
    onDelete: (id: number) => void;
}

export function Editor({ note, onUpdate, onDelete }: EditorProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Sync internal state when the active note changes
    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    if (!note) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50/50">
                <div className="p-4 rounded-full bg-slate-100 mb-4">
                    <Clock size={48} className="text-slate-300" />
                </div>
                <p className="text-lg font-medium">Select a note to view or edit</p>
                <p className="text-sm">Or create a new one from the sidebar</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-300">
            {/* Editor Toolbar */}
            <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                        <Clock size={14} /> Last edited: {new Date(note.id).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onDelete(note.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete Note"
                    >
                        <Trash2 size={18} />
                    </button>
                    <button
                        onClick={() => onUpdate(note.id, title, content)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-shadow shadow-sm"
                    >
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </div>

            {/* Title Input */}
            <div className="px-8 pt-8">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note Title"
                    className="w-full text-4xl font-bold border-none outline-none placeholder:text-slate-200 text-slate-800"
                />
            </div>

            {/* Content Area */}
            <div className="flex-1 px-8 py-4">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start typing your thoughts..."
                    className="w-full h-full resize-none border-none outline-none text-lg leading-relaxed text-slate-600 placeholder:text-slate-300"
                />
            </div>
        </div>
    );
}