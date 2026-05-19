import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, X, Pill, Repeat, Calendar, Clock, ArrowLeftCircle, Save
} from "lucide-react";

// --- Reusable Animated Background Component ---
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
      <style>{` @keyframes kenburns { 0% { transform: scale(1.1); } 100% { transform: scale(1); } } .bg-image-animate { animation: kenburns 20s ease-in-out infinite alternate; } `}</style>
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


// --- Main AddMedication Component ---
export default function AddMedication() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    times: [""],
    image: "" // Keeping the image field for future use, can be left blank
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (index, value) => {
    const updated = [...form.times];
    updated[index] = value;
    setForm((prev) => ({ ...prev, times: updated }));
  };

  const addTimeField = () => {
    setForm((prev) => ({ ...prev, times: [...prev.times, ""] }));
  };

  const removeTimeField = (index) => {
    const updated = form.times.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, times: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("medications")) || [];
    const newMed = { id: Date.now().toString(), ...form };
    localStorage.setItem("medications", JSON.stringify([...stored, newMed]));
    
    // ✅ CORRECTED: Navigate directly to the manage page to see the new entry
    navigate("/manage-medications"); 
  };

  return (
    <div className="min-h-screen w-full font-[Poppins]">
      <BackgroundSlideshow />
      <div className="fixed inset-0 z-20 grid place-items-center overflow-y-auto p-4">
        <div className="absolute inset-0 bg-black/60 -z-10"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Add New Medication</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* --- Left Column: Core Details --- */}
                <div className="space-y-6">
                    <div className="relative">
                        <label className="block text-sm font-medium text-white/80 mb-1">Medication Name</label>
                        <Pill className="absolute left-3 bottom-3.5 text-white/50" size={20}/>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="e.g., Aspirin" className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none"/>
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-white/80 mb-1">Dosage</label>
                         <Pill className="absolute left-3 bottom-3.5 text-white/50" size={20}/>
                        <input type="text" name="dosage" value={form.dosage} onChange={handleChange} required placeholder="e.g., 500mg" className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none"/>
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-white/80 mb-1">Frequency</label>
                        <Repeat className="absolute left-3 bottom-3.5 text-white/50" size={20}/>
                        <input type="text" name="frequency" value={form.frequency} onChange={handleChange} required placeholder="e.g., Twice daily" className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none"/>
                    </div>
                </div>

                {/* --- Right Column: Scheduling --- */}
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="relative">
                             <label className="block text-sm font-medium text-white/80 mb-1">Start Date</label>
                             <Calendar className="absolute left-3 bottom-3.5 text-white/50" size={20}/>
                             <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none custom-date-input"/>
                        </div>
                         <div className="relative">
                            <label className="block text-sm font-medium text-white/80 mb-1">End Date</label>
                             <Calendar className="absolute left-3 bottom-3.5 text-white/50" size={20}/>
                            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none custom-date-input"/>
                        </div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl">
                        <label className="block text-sm font-medium text-white/80 mb-2">Time(s) of Day</label>
                        <div className="space-y-3">
                            <AnimatePresence>
                                {form.times.map((time, index) => (
                                <motion.div 
                                    key={index} 
                                    className="flex gap-3 items-center"
                                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                                >
                                    <div className="relative flex-grow">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20}/>
                                        <input type="time" value={time} onChange={(e) => handleTimeChange(index, e.target.value)} required className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none custom-date-input"/>
                                    </div>
                                    {form.times.length > 1 && (
                                    <button type="button" onClick={() => removeTimeField(index)} className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/20 transition"><X size={18} /></button>
                                    )}
                                </motion.div>
                                ))}
                            </AnimatePresence>
                            <button
                                type="button" onClick={addTimeField}
                                className="text-cyan-300 font-medium hover:text-cyan-200 text-sm flex items-center gap-1 transition"
                            ><Plus size={16} /> Add Time</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Form Actions --- */}
            <div className="flex justify-between items-center pt-8 mt-4 border-t border-white/10">
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        to="/admin-dashboard"
                        className="flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-white/20 hover:text-white transition-all"
                    >
                        <ArrowLeftCircle size={20} />
                        Back to Dashboard
                    </Link>
               </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex items-center gap-2 bg-cyan-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-600 hover:shadow-cyan-500/40 transition-all"
              >
                <Save size={20}/> Save Medication
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
      <style>{`.custom-date-input::-webkit-calendar-picker-indicator { filter: invert(1) brightness(0.8); cursor: pointer; }`}</style>
    </div>
  );
}