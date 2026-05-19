import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, LogIn, AlertCircle, CheckCircle, Info } from "lucide-react";

// --- Reusable Animated Background Component ---
const backgroundImages = [
  "https://images.unsplash.com/photo-1576091160_550-2173dba999ef?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1581056771107-24a7f072781b?auto=format&fit=crop&w=1950&q=80",
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


// --- Main Login Component ---
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const registered = query.get("registered");
  const logout = query.get("logout");

  const handleSubmit = (e) => {
    e.preventDefault();
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const matchedUser = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      sessionStorage.setItem("authToken", "dummy-token-xyz");
      sessionStorage.setItem("authRole", matchedUser.role.toLowerCase());
      sessionStorage.setItem("authUser", matchedUser.username);
      
      if (matchedUser.role.toLowerCase() === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="min-h-screen w-full font-[Poppins]">
        <BackgroundSlideshow />
        <div className="fixed inset-0 z-20 grid place-items-center bg-black/60 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20"
            >
                <motion.h2
                    className="text-3xl font-bold text-white text-center mb-6 flex items-center justify-center gap-3"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                >
                    <LogIn className="w-8 h-8 text-cyan-300"/> Member Login
                </motion.h2>

                <AnimatePresence>
                    {error && (
                        <motion.div initial={{opacity: 0, height: 0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height: 0}} className="mb-4 text-center text-red-300 bg-red-500/20 p-3 rounded-lg flex items-center gap-2 justify-center border border-red-500/30">
                            <AlertCircle size={18}/> {error}
                        </motion.div>
                    )}
                    {registered && (
                         <motion.div initial={{opacity: 0, height: 0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height: 0}} className="mb-4 text-center text-green-300 bg-green-500/20 p-3 rounded-lg flex items-center gap-2 justify-center border border-green-500/30">
                            <CheckCircle size={18}/> Registered! Please log in.
                        </motion.div>
                    )}
                    {logout && (
                         <motion.div initial={{opacity: 0, height: 0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height: 0}} className="mb-4 text-center text-blue-300 bg-blue-500/20 p-3 rounded-lg flex items-center gap-2 justify-center border border-blue-500/30">
                            <Info size={18}/> You have been logged out.
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20}/>
                        <input
                            type="text" required autoFocus
                            value={username} onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full p-4 pl-12 rounded-full bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20}/>
                        <input
                            type="password" required
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-4 pl-12 rounded-full bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-white py-3 rounded-full font-bold hover:bg-cyan-600 shadow-lg hover:shadow-cyan-500/40 transition-all text-lg"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-8 text-center text-white/70">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-cyan-300 hover:text-cyan-200 hover:underline">
                        Register here
                    </Link>
                </p>
            </motion.div>
        </div>
    </div>
  );
}