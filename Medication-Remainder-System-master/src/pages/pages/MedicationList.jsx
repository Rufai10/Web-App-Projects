import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftCircle, Search, RefreshCw, Pill } from "lucide-react";

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


// --- Main Medication List Component ---
export default function MedicationList({ dashboardRoute = "/" }) {
  const [medications, setMedications] = useState([]);
  const [keyword, setKeyword] = useState("");
  const constraintsRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("medications")) || [];
    setMedications(stored);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("medications")) || [];
    if (!keyword) {
      setMedications(stored);
      return;
    }
    const filtered = stored.filter((m) =>
      m.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setMedications(filtered);
  };

  const resetSearch = () => {
    setKeyword("");
    const stored = JSON.parse(localStorage.getItem("medications")) || [];
    setMedications(stored);
  };

  return (
    <div className="min-h-screen w-full font-[Poppins]">
      <BackgroundSlideshow />
      
      <div ref={constraintsRef} className="fixed inset-0 z-20 grid place-items-center overflow-y-auto p-4">
        <div className="absolute inset-0 bg-black/60 -z-10"></div>

        <motion.div
          drag
          dragConstraints={constraintsRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8 cursor-move flex items-center justify-center gap-3">
            <Pill /> Medication List
          </h2>

          <form
            onSubmit={handleSearch}
            className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 items-center"
          >
            <div className="relative flex-grow w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full p-4 pl-12 rounded-full bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                placeholder="Search by medication name..."
              />
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="submit"
                className="flex-1 sm:flex-none bg-cyan-500 text-white font-bold px-6 py-3 rounded-full hover:bg-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center gap-2"
              >
                <Search size={18} /> Search
              </button>
              <button
                type="button"
                onClick={resetSearch}
                className="flex-1 sm:flex-none bg-white/10 text-white/80 font-bold px-6 py-3 rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} /> Reset
              </button>
            </div>
          </form>

          <div className="overflow-x-auto mt-8 bg-black/20 rounded-2xl shadow-inner border border-white/10">
            <table className="min-w-full text-sm text-white/90">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Dosage</th>
                  <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Frequency</th>
                  <th className="px-4 py-3 text-left font-semibold">Time(s)</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Start Date</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">End Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <AnimatePresence>
                  {medications.length === 0 ? (
                    <motion.tr layout>
                      <td colSpan="6" className="text-center py-16 text-white/70 font-medium">
                        No medications found.
                      </td>
                    </motion.tr>
                  ) : (
                    medications.map((med) => (
                      <motion.tr
                        key={med.id}
                        className="hover:bg-white/10 transition-colors"
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: {duration: 0.1} }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-4 py-3 font-medium text-cyan-300">{med.name}</td>
                        <td className="px-4 py-3 text-white/80">{med.dosage}</td>
                        <td className="px-4 py-3 text-white/80 hidden md:table-cell">{med.frequency}</td>
                        <td className="px-4 py-3 text-white/80">
                          {Array.isArray(med.times) ? med.times.join(", ") : med.times || "—"}
                        </td>
                        <td className="px-4 py-3 text-white/80 hidden lg:table-cell">{med.startDate}</td>
                        <td className="px-4 py-3 text-white/80 hidden lg:table-cell">{med.endDate}</td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                to={dashboardRoute}
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
