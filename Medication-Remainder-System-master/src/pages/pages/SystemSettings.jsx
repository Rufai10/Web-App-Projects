import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Bell, PlusCircle, Settings, LogOut, Save, AlertTriangle, Palette, Film, Moon, Sun, Trash2, Pill
} from 'lucide-react';

// --- Reusable Layout & Background Components (No changes needed) ---
const AdminLayout = ({ children, title, subtitle }) => (
     <div className="relative min-h-screen w-full font-[Poppins]">
        <BackgroundSlideshow />
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
            <aside className="w-full md:w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 p-6 flex-col justify-start shadow-2xl hidden md:flex">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-12"><Pill /> MedTrack</h2>
                <nav className="space-y-4">
                     {[
                        { title: "Dashboard", icon: LayoutDashboard, link: "/admin-dashboard" },
                        { title: "Add Medication", icon: PlusCircle, link: "/add-medication" },
                        { title: "Manage Users", icon: Users, link: "/admin/manage-users" },
                        { title: "Settings", icon: Settings, link: "/admin/settings" },
                        { title: "Logout", icon: LogOut, link: "/login?logout=true", color: "text-red-400 hover:bg-red-500/20" },
                    ].map((item, i) => (
                        <Link key={i} to={item.link} className={`flex items-center gap-4 p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/20 font-semibold transition-all duration-200 ${item.color || ''}`}>
                            <item.icon size={20} /> {item.title}
                        </Link>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                 <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                  <h1 className="text-4xl font-bold text-white tracking-wider">{title}</h1>
                  <p className="text-blue-200 text-lg">{subtitle}</p>
                </motion.header>
                {children}
            </main>
        </div>
    </div>
);
const BackgroundSlideshow = () => { /* ... same as before ... */ return <div/>; };


// --- Custom Toggle Switch Component ---
const ToggleSwitch = ({ enabled, setEnabled }) => (
    <div onClick={() => setEnabled(!enabled)} className={`relative inline-flex items-center h-7 rounded-full w-14 cursor-pointer transition-colors duration-300 ease-in-out ${enabled ? 'bg-cyan-500' : 'bg-gray-600/50'}`}>
      <motion.span layout className="inline-block w-5 h-5 transform bg-white rounded-full mx-1" transition={{ type: "spring", stiffness: 700, damping: 30 }} />
    </div>
);

// --- System Settings Page Component ---
export default function SystemSettings() {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [accentColor, setAccentColor] = useState('cyan');
    const [animationIntensity, setAnimationIntensity] = useState(1);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const accentColors = ['cyan', 'blue', 'purple', 'green', 'orange'];

    const handleClearData = () => {
        if (window.confirm('ARE YOU SURE?\nThis will delete all medication data permanently.')) {
            localStorage.removeItem('medications');
            alert('All medication data has been cleared.');
        }
    };

    return (
        <AdminLayout title="Control Panel" subtitle="Customize the core experience of the application.">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Main Settings */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">
                        <h3 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2"><Palette/> Interface Customization</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-white/80">Theme</span>
                                <div className="flex items-center gap-2 p-1 rounded-full bg-black/20">
                                    <button onClick={() => setIsDarkMode(false)} className={`p-1 rounded-full ${!isDarkMode ? 'bg-white/20' : ''}`}><Sun className="text-white"/></button>
                                    <button onClick={() => setIsDarkMode(true)} className={`p-1 rounded-full ${isDarkMode ? 'bg-white/20' : ''}`}><Moon className="text-white"/></button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-white/80">Accent Color</span>
                                <div className="flex gap-2">
                                    {accentColors.map(color => (
                                        <button key={color} onClick={() => setAccentColor(color)} style={{backgroundColor: color}} className={`w-6 h-6 rounded-full transition-transform ${accentColor === color ? 'ring-2 ring-white scale-110' : 'hover:scale-110'}`}></button>
                                    ))}
                                </div>
                            </div>
                             <div className="flex flex-col">
                                <label className="font-medium text-white/80 mb-2">Animation Intensity</label>
                                <input type="range" min="0" max="2" step="0.1" value={animationIntensity} onChange={e => setAnimationIntensity(e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Advanced & Danger Zone */}
                <div className="lg:col-span-1 space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">
                        <h3 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2"><Bell/> Notification Engine</h3>
                         <div className="flex justify-between items-center">
                            <span className="font-medium text-white/80">Enable All</span>
                            <ToggleSwitch enabled={true} setEnabled={()=>{}} />
                        </div>
                    </motion.div>
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} className="bg-red-900/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-red-500/30">
                        <h3 className="text-xl font-semibold text-red-300 mb-2 flex items-center gap-2"><AlertTriangle/> Danger Zone</h3>
                        <p className="text-sm text-white/60 mb-4">This action cannot be undone. Please be certain.</p>
                        <button onClick={handleClearData} className="w-full flex items-center justify-center gap-2 bg-red-600/80 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition">
                            <Trash2 size={16}/> Clear Medication Data
                        </button>
                    </motion.div>
                </div>
            </div>
        </AdminLayout>
    );
}