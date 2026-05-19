import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftCircle, BellRing, Volume2, VolumeX } from "lucide-react";

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
      <style>{`
        @keyframes kenburns { 0% { transform: scale(1.1); } 100% { transform: scale(1); } }
        .bg-image-animate { animation: kenburns 20s ease-in-out infinite alternate; }
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

// --- Main Notifications Component ---
export default function Notifications() {
  const [medications, setMedications] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [audioNeedsUnlock, setAudioNeedsUnlock] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3");
    audioRef.current.volume = 0.8;
    const stored = JSON.parse(localStorage.getItem("medications")) || [];
    setMedications(stored);

    if (stored.length > 0) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audioRef.current.pause();
          setIsMuted(false); 
        }).catch(() => {
          setAudioNeedsUnlock(true);
          setIsMuted(true);
        });
      }
    }
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.error("Error playing sound:", err));
    }
  }

  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioNeedsUnlock && !newMutedState) {
      setAudioNeedsUnlock(false);
      playSound();
    } else if (!newMutedState) {
      playSound();
    }
  };

  return (
    <div className="min-h-screen w-full font-[Poppins]">
      <style>{`
        @keyframes pulse-cyan {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
          50% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(34, 211, 238, 0); }
        }
        .animate-pulse-cyan { animation: pulse-cyan 2s infinite; }
      `}</style>

      <BackgroundSlideshow />

      <div className="fixed inset-0 z-20 grid place-items-center overflow-y-auto p-4">
        <div className="absolute inset-0 bg-black/60 -z-10"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-2xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20"
        >
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <BellRing className="w-8 h-8 text-cyan-300" />
              Medication Notifications
            </h2>
            <button 
              onClick={handleToggleMute} 
              className={`p-2 rounded-full transition-colors ${audioNeedsUnlock ? 'animate-pulse-cyan bg-cyan-500/20' : 'hover:bg-white/10'}`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-6 h-6 text-cyan-300" /> : <Volume2 className="w-6 h-6 text-white/80" />}
            </button>
          </div>

          <AnimatePresence>
            {audioNeedsUnlock && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-cyan-900/40 border border-cyan-500/50 text-cyan-200 text-sm rounded-lg p-3 text-center mb-4"
              >
                Sound is off. Click the pulsing volume icon to enable notifications.
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {medications.length === 0 ? (
              <div className="text-center py-16 text-white/70 font-medium">
                No notifications found.
              </div>
            ) : (
              <AnimatePresence>
                {medications.map((med, index) => (
                  <motion.div
                    key={med.id || index}
                    className="bg-black/20 border-l-4 border-cyan-400 p-4 rounded-lg shadow-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <p className="font-semibold text-white">{med.name}</p>
                    <p className="text-sm text-white/80">Take {med.dosage} - {med.frequency}.</p>
                    <p className="text-xs text-white/60 mt-1">(From {med.startDate} to {med.endDate})</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <div className="mt-8 text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                to={sessionStorage.getItem("isAdmin") === "true" ? "/admin-dashboard" : "/user-dashboard"}
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
