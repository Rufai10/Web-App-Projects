import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Bell,
  PlusCircle,
  BarChart3,
  LogOut,
  Calendar,
  LayoutDashboard,
  Users,
  Settings,
  Pill,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

// --- Reusable Animated Background Component ---
const backgroundImages = [
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1584515933487-779824d279f9?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1542736667-069246b5f62d?auto=format&fit=crop&w=1950&q=80",
];
const animations = [ { name: 'kenburns', duration: '20s' }, { name: 'pan-right', duration: '25s' } ];

const BackgroundSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="fixed inset-0 z-0">
      <style>{`
        @keyframes kenburns { 0% { transform: scale(1.1); } 100% { transform: scale(1); } }
        @keyframes pan-right { 0% { transform: translateX(-5%); } 100% { transform: translateX(5%); } }
      `}</style>
      <AnimatePresence>
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})`, animation: `${animations[currentImageIndex % 2].name} 25s ease-in-out infinite alternate` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.5 } }} exit={{ opacity: 0 }}
        />
      </AnimatePresence>
    </div>
  );
};


// --- Main Admin Dashboard Component ---
export default function AdminDashboard() {
  const [medicationCount, setMedicationCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
      const meds = JSON.parse(localStorage.getItem("medications")) || [];
      setMedicationCount(meds.length);
      
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      setUserCount(users.length);
  }, []);

  // ✅ UPDATED SIDEBAR LINKS TO INCLUDE "MANAGE MEDICATIONS"
  const sidebarLinks = [
    { title: "Dashboard", icon: LayoutDashboard, link: "/admin-dashboard" },
    { title: "Add Medication", icon: PlusCircle, link: "/add-medication" },
    { title: "Medications", icon: ClipboardList, link: "/medications" },
    { title: "Manage Medications", icon: Settings, link: "/manage-medications" }, 
    { title: "Notifications", icon: Bell, link: "/notifications" },
    { title: "Reports", icon: BarChart3, link: "/reports" },
    { title: "Calendar", icon: Calendar, link: "/calendar" },
    { title: "Logout", icon: LogOut, link: "/login?logout=true", color: "text-red-400 hover:bg-red-500/20" },
  ];
  
  const quickActions = [
      { title: "Add Medication", icon: PlusCircle, link: "/add-medication", description: "Create a new medication entry." },
      { title: "View All Reports", icon: BarChart3, link: "/reports", description: "Analyze data and generate reports." },
      { title: "View Medication List", icon: ClipboardList, link: "/medications", description: "Browse and manage all entries." },
      { title: "Total Medications", icon: Pill, count: medicationCount, isStat: true },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 font-[Poppins]">
      <BackgroundSlideshow />
      <div className="absolute inset-0 bg-black/60"></div>

      {/* --- Sidebar --- */}
      <aside className="z-10 w-full md:w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 p-6 flex-col justify-start shadow-2xl hidden md:flex">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-12">
          <LayoutDashboard /> ADMIN 
        </h2>
        <nav className="space-y-4">
          {sidebarLinks.map((item, i) => (
            <Link key={i} to={item.link} className={`flex items-center gap-4 p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/20 font-semibold transition-all duration-200 ${item.color || ''}`}>
              <item.icon size={20} /> {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* --- Main Content --- */}
      <main className="z-10 flex-1 p-6 md:p-8 bg-transparent overflow-y-auto flex flex-col justify-between">
        <div>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
              <h1 className="text-4xl font-bold text-white tracking-wider">Welcome, Administrator</h1>
              <p className="text-blue-200 text-lg">Select an action to begin managing your system.</p>
            </motion.header>

            {/* --- Quick Actions Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {quickActions.map((action, i) => (
                  action.isStat ? (
                      // STAT CARD
                      <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                          className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10 flex flex-col items-center justify-center text-center"
                      >
                          <action.icon className="h-12 w-12 mb-3 text-cyan-300" />
                          <h3 className="text-2xl font-bold text-white">{action.title}</h3>
                          <p className="text-6xl font-bold text-white mt-2">{action.count}</p>
                      </motion.div>
                  ) : (
                      // ACTION CARD
                      <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                      >
                          <Link 
                            to={action.link} 
                            className="block h-full p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-cyan-400/50 hover:scale-105 transition-all duration-300"
                          >
                              <action.icon className="h-12 w-12 mb-3 text-cyan-300" />
                              <h3 className="text-2xl font-bold text-white">{action.title}</h3>
                              <p className="text-white/70">{action.description}</p>
                          </Link>
                      </motion.div>
                  )
              ))}
            </div>
        </div>
        
        {/* --- Footer --- */}
        <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            className="text-center text-white/50 mt-10"
        >
          <p>© {new Date().getFullYear()} Medication Reminder System. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="hover:text-white"><Github size={18}/></a>
              <a href="#" className="hover:text-white"><Twitter size={18}/></a>
              <a href="#" className="hover:text-white"><Linkedin size={18}/></a>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}