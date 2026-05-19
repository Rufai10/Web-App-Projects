import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList, Bell, BarChart3, LogOut, Calendar, User, Pill
} from "lucide-react";

// --- Reusable Animated Background Component ---
const backgroundImages = [
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1584515933487-779824d279f9?auto=format&fit=crop&w=1950&q=80",
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


// --- Main User Dashboard Component ---
export default function UserDashboard() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Get the logged-in user's name from session storage
    const storedName = sessionStorage.getItem("authUser");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const actionCards = [
    { title: "My Medications", icon: ClipboardList, link: "/medications", description: "View your list of medications." },
    { title: "My Calendar", icon: Calendar, link: "/calendar", description: "See your schedule at a glance." },
    { title: "Notifications", icon: Bell, link: "/notifications", description: "Check your reminders and alerts." },
    { title: "My Reports", icon: BarChart3, link: "/reports", description: "Analyze your adherence and history." },
  ];

  const sidebarLinks = [
    ...actionCards,
    { title: "Logout", icon: LogOut, link: "/login?logout=true", color: "text-red-400 hover:bg-red-500/20" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 font-[Poppins]">
      <BackgroundSlideshow />
      <div className="absolute inset-0 bg-black/60"></div>

      {/* --- Sidebar --- */}
      <aside className="z-10 w-full md:w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 p-6 flex-col justify-start shadow-2xl hidden md:flex">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-12">
          <User className="text-cyan-300"/> {userName}
        </h2>
        <nav className="space-y-4">
          {sidebarLinks.map((item, i) => (
            <Link key={i} to={item.link} className={`flex items-center gap-4 p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/20 font-semibold transition-all duration-200 ${item.color || ''}`}>
              <item.icon size={20} /> {item.title}
            </Link>
          ))}
        </nav>
        <div className="mt-auto text-center text-white/50 text-xs">
             <Pill size={24} className="mx-auto mb-2"/>
             MedTrack System
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="z-10 flex-1 p-6 md:p-8 bg-transparent overflow-y-auto">
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
        >
          <h1 className="text-4xl font-bold text-white tracking-wider">Welcome to user Dashboard</h1>
          <p className="text-blue-200 text-lg">Your personal hub for managing your medication schedule.</p>
        </motion.header>

        {/* --- Quick Actions Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actionCards.map((card, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                >
                    <Link 
                    to={card.link} 
                    className="block h-full p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-cyan-400/50 hover:scale-105 transition-all duration-300 text-center"
                    >
                        <card.icon className="h-16 w-16 mb-4 text-cyan-300 mx-auto" />
                        <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                        <p className="text-white/70 mt-1">{card.description}</p>
                    </Link>
                </motion.div>
            ))}
        </div>
      </main>
    </div>
  );
}