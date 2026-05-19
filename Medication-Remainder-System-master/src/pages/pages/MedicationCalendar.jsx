import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // We will override this with custom styles
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, Pill, Clock, CheckCircle, ArrowLeftCircle } from "lucide-react";

// --- Advanced BackgroundSlideshow Component ---
const backgroundImages = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1950&q=80",
];

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
        .bg-image-animate { animation: kenburns 20s ease-in-out infinite alternate; }
        
        /* Custom React Calendar Styles */
        .react-calendar { background: transparent; border: none; font-family: 'Poppins', sans-serif; }
        .react-calendar__navigation button { color: #ecfeff; font-weight: bold; }
        .react-calendar__navigation button:hover, .react-calendar__navigation button:focus { background: rgba(255,255,255,0.1); }
        .react-calendar__month-view__weekdays { text-transform: uppercase; font-weight: 600; color: rgba(255,255,255,0.5); }
        .react-calendar__tile { color: rgba(255,255,255,0.8); border-radius: 0.5rem; transition: all 0.2s ease; }
        .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus { background-color: rgba(255,255,255,0.1); }
        .react-calendar__tile--now { background: rgba(6, 182, 212, 0.2) !important; color: #ecfeff; }
        .react-calendar__tile--active { background: #06b6d4 !important; color: white; }
        .medication-dot { height: 6px; width: 6px; background-color: #67e8f9; border-radius: 50%; position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); }
      `}</style>
      <AnimatePresence>
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-cover bg-center bg-image-animate"
          style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.5 } }} exit={{ opacity: 0 }}
        />
      </AnimatePresence>
    </div>
  );
};


// --- Main MedicationCalendar Component ---
export default function MedicationCalendar() {
  const [value, setValue] = useState(new Date());
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("medications")) || [];
    setMedications(stored);
  }, []);

  const getMedsForDate = (date) => {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    return medications.filter((med) => {
      const start = new Date(med.startDate);
      const end = new Date(med.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return targetDate >= start && targetDate <= end;
    });
  };

  const getStatusBadge = (startDate, endDate) => {
    const now = new Date();
    now.setHours(0,0,0,0);
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return { label: "Upcoming", icon: <Clock size={14} />, color: "bg-yellow-500/20 text-yellow-300" };
    if (now > end) return { label: "Completed", icon: <CheckCircle size={14} />, color: "bg-gray-500/20 text-gray-300" };
    return { label: "Ongoing", icon: <CheckCircle size={14} />, color: "bg-green-500/20 text-green-300" };
  };

  const selectedMeds = getMedsForDate(value);

  return (
    <div className="min-h-screen w-full font-[Poppins]">
      <BackgroundSlideshow />
      <div className="fixed inset-0 z-20 grid place-items-center overflow-y-auto p-4">
        <div className="absolute inset-0 bg-black/60 -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20"
        >
          <motion.h2
            className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3"
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          >
            <CalendarDays className="w-8 h-8 text-cyan-300" />
            Medication Calendar
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-black/20 p-4 rounded-2xl shadow-inner border border-white/10">
                <Calendar
                    onChange={setValue}
                    value={value}
                    tileContent={({ date }) => getMedsForDate(date).length > 0 ? <div className="medication-dot"></div> : null}
                />
            </div>
            
            <div className="bg-black/20 p-4 rounded-2xl shadow-inner border border-white/10 h-[60vh] overflow-y-hidden flex flex-col">
              <h3 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2 flex-shrink-0">
                <Pill size={22} className="text-cyan-300"/>
                Schedule for {value.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </h3>
              
              <ul className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {selectedMeds.length === 0 ? (
                    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-white/70">
                        <CalendarDays size={48} className="mb-4"/>
                        <p>No medications scheduled.</p>
                    </motion.div>
                  ) : (
                    selectedMeds.map((med) => {
                      const status = getStatusBadge(med.startDate, med.endDate);
                      return (
                        <motion.li
                          key={med.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-black/20 border-l-4 border-cyan-400 p-4 rounded-lg shadow-md"
                        >
                          <p className="font-bold text-white">{med.name}</p>
                          <p className="text-sm text-white/80">{med.dosage} - {med.frequency}</p>
                           <div className={`mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                              {status.icon} {status.label}
                           </div>
                        </motion.li>
                      );
                    })
                  )}
                </AnimatePresence>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link
                    to="/admin-dashboard"
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-white/20 hover:text-white transition-all"
                >
                    <ArrowLeftCircle size={20}/>
                    Back to Dashboard
                </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}