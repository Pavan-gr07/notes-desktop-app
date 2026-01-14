import { User, Shield, Bell, Moon } from 'lucide-react';

export function SettingsView({ user, setUser }: any) {
    const updateName = (e: any) => {
        const newUser = { ...user, name: e.target.value };
        setUser(newUser);
        window.api.saveSettings({ user: newUser });
    };

    return (
        <div className="p-10 max-w-2xl mx-auto animate-in slide-in-from-bottom-2 duration-500">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="space-y-8">
                <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="text-blue-600" size={20} />
                        <h2 className="font-semibold">Profile Settings</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Display Name</label>
                            <input
                                type="text"
                                value={user.name}
                                onChange={updateName}
                                className="w-full p-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <Moon className="text-slate-600" size={20} />
                        <h2 className="font-semibold">Appearance</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Dark Mode (Experimental)</span>
                        <div className="w-10 h-5 bg-slate-300 rounded-full relative cursor-not-allowed">
                            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}