import { StickyNote, Calendar, FileText, Settings, LayoutGrid } from 'lucide-react';
import { Module } from '../types';

export function ActivityBar({ active, setActive }: { active: String, setActive: (m: Module) => void }) {
    const items = [
        { id: 'notes', icon: StickyNote, label: 'Notes' },
        { id: 'calendar', icon: Calendar, label: 'Calendar' },
        { id: 'files', icon: FileText, label: 'Files' },
    ];

    return (
        <aside className="w-16 flex flex-col items-center py-4 bg-slate-100 border-r border-slate-200 gap-4">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActive(item.id as Module)}
                    className={`relative p-3 rounded-xl transition-all group ${active === item.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                        }`}
                >
                    <item.icon size={22} strokeWidth={active === item.id ? 2.5 : 2} />
                    {active === item.id && <div className="absolute left-0 top-1/4 w-1 h-1/2 bg-blue-600 rounded-r-full" />}
                    <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all origin-left bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-md z-50">
                        {item.label}
                    </span>
                </button>
            ))}

            <div className="mt-auto flex flex-col gap-4">
                <button onClick={() => setActive('settings')} className="text-slate-500 hover:text-slate-900 p-3">
                    <Settings size={22} />
                </button>
                <button className="text-slate-500 hover:text-slate-900 p-3">
                    <LayoutGrid size={22} />
                </button>
            </div>
        </aside>
    );
}