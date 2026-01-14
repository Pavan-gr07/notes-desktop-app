import { Search, User, Minus, Square, X } from 'lucide-react';
import logo from '../../../../public/finance-icon.png';
import { UserProfile } from '../types';

interface TitleBarProps {
    user: UserProfile;
}


export function TitleBar({ user }: TitleBarProps) {
    return (
        <div
            className="flex h-12 items-center justify-between bg-white border-b border-gray-200 px-4 select-none"
            style={{ WebkitAppRegion: 'drag' } as any}
        >
            {/* LEFT: Logo & Name */}
            <div className="flex items-center gap-2">
                <img src={logo} className="w-5 h-5" alt="App Logo" />
                <span className="text-sm font-bold text-gray-700 tracking-tight">ElectronNotes</span>
            </div>

            {/* CENTER: Professional Search Bar */}
            <div className="flex-1 flex justify-center px-10" style={{ WebkitAppRegion: 'no-drag' } as any}>
                <div className="relative w-full max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500" />
                    <input
                        type="text"
                        placeholder="Search your notes..."
                        className="w-full bg-gray-100 border-none h-8 pl-10 pr-4 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none"
                    />
                </div>
            </div>

            {/* RIGHT: Profile & Native-style Controls */}
            <div className="flex items-center gap-1" style={{ WebkitAppRegion: 'no-drag' } as any}>
                <button className="p-2 hover:bg-gray-100 rounded-full mr-2 transition-colors">
                    <User className="w-4 h-4 text-gray-600" />
                </button>

                <div className="flex">
                    <button
                        onClick={() => window.api.minimize()}
                        className="p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => window.api.maximize()}
                        className="p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                        <Square className="w-3 h-3" />
                    </button>
                    <button
                        onClick={() => window.api.close()}
                        className="p-2 w-10 h-10 flex items-center justify-center hover:bg-red-500 hover:text-white text-gray-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <span>{user.name}</span>
        </div>
    );
}