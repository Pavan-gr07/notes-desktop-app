import { Note } from '../types';
import { Plus } from 'lucide-react';

interface SidePanelProps {
    notes: Note[];
    activeNote: Note | null;
    onSelect: (note: Note) => void;
    onNew: () => void;
}

export function SidePanel({ notes, activeNote, onSelect, onNew }: SidePanelProps) {
    return (
        <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col">
            <div className="p-4 flex items-center justify-between">
                <h2 className="font-bold text-slate-700">Notes</h2>
                <button onClick={onNew} className="p-1 hover:bg-slate-200 rounded transition-colors">
                    <Plus size={18} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {notes.map((note) => (
                    <button
                        key={note.id}
                        onClick={() => onSelect(note)}
                        className={`w-full text-left p-3 rounded-lg text-sm transition-all ${activeNote?.id === note.id
                                ? 'bg-blue-100 text-blue-700 font-medium shadow-sm'
                                : 'hover:bg-white text-slate-600'
                            }`}
                    >
                        {note.title || "Untitled Note"}
                    </button>
                ))}
            </div>
        </aside>
    );
}