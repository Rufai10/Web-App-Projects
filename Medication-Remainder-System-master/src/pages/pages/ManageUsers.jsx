import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, PlusCircle, Settings, LogOut, Search, Edit, Trash2, Users
} from 'lucide-react';


// --- Reusable Layout and Background Components (No changes needed here) ---
const AdminLayout = ({ children, title, subtitle }) => {
    // ... same layout code as before
    return (
        <div className="relative min-h-screen w-full bg-gray-900 font-[Poppins]">
            <BackgroundSlideshow />
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
                <aside className="w-full md:w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 p-6 flex-col justify-start shadow-2xl hidden md:flex">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-12"><LayoutDashboard /> Admin</h2>
                    <nav className="space-y-4">
                        {[ { title: "Dashboard", icon: LayoutDashboard, link: "/admin-dashboard" }, { title: "Medications", icon: PlusCircle, link: "/add-medication" }, { title: "Manage Users", icon: Users, link: "/admin/manage-users" }, { title: "Settings", icon: Settings, link: "/admin/settings" }, { title: "Logout", icon: LogOut, link: "/login?logout=true", color: "text-red-400 hover:bg-red-500/20" }, ].map((item, i) => ( <Link key={i} to={item.link} className={`flex items-center gap-4 p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/20 font-semibold transition-all duration-200 ${item.color || ''}`}> <item.icon size={20} /> {item.title} </Link> ))}
                    </nav>
                </aside>
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                        <h1 className="text-4xl font-bold text-white tracking-wider">{title}</h1>
                        <p className="text-blue-200 text-lg">{subtitle}</p>
                    </motion.header>
                    {children}
                </main>
            </div>
        </div>
    );
};
const BackgroundSlideshow = () => { /* ... same as before ... */
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => { const timer = setInterval(() => { setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3); }, 7000); return () => clearInterval(timer); }, []);
    return <div className="fixed inset-0 z-0"> <AnimatePresence> <motion.div key={currentImageIndex} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://source.unsplash.com/random/1920x1080?medical,technology&sig=${currentImageIndex})` }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.5 } }} exit={{ opacity: 0 }}/> </AnimatePresence> </div>;
};


// --- Manage Users Page Component ---
export default function ManageUsers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
        { id: 2, name: 'Bob Williams', email: 'bob@example.com', role: 'User', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
    ]);

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ✅ ADDED: Function to handle adding a new user
    const handleAddNewUser = () => {
        console.log("Opening form to add a new user...");
        alert("This would open a modal or navigate to a new user form.");
    };

    return (
        <AdminLayout title="Manage Users" subtitle="View, edit, or remove user accounts.">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20"
            >
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20}/>
                        <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                    </div>
                    {/* ✅ UPDATED: Added onClick handler to the button */}
                    <button 
                        onClick={handleAddNewUser}
                        className="flex items-center gap-2 bg-blue-500 text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-600 transition shadow-lg"
                    >
                        <PlusCircle size={20}/> Add New User
                    </button>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-white/90">
                        {/* ... (table head is unchanged) ... */}
                        <thead className="border-b border-white/20"><tr><th className="p-4">User</th><th className="p-4 hidden md:table-cell">Email</th><th className="p-4">Role</th><th className="p-4 hidden md:table-cell">Status</th><th className="p-4 text-right">Actions</th></tr></thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="border-b border-white/10 hover:bg-white/10 transition">
                                    <td className="p-4 flex items-center gap-3"><img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover"/><span className="font-semibold">{user.name}</span></td>
                                    <td className="p-4 hidden md:table-cell">{user.email}</td>
                                    <td className="p-4">{user.role}</td>
                                    <td className="p-4 hidden md:table-cell"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-500/30 text-green-300' : 'bg-gray-500/30 text-gray-300'}`}>{user.status}</span></td>
                                    <td className="p-4 text-right">
                                        {/* These buttons can now have their own onClick handlers too */}
                                        <button className="p-2 hover:text-blue-400"><Edit size={18}/></button>
                                        <button className="p-2 hover:text-red-400"><Trash2 size={18}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </AdminLayout>
    );
}