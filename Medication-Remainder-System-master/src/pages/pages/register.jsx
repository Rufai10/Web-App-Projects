import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, ShieldCheck, UserPlus, AlertCircle, CheckCircle, ChevronDown } from "lucide-react";

// --- Reusable Animated Background Component ---
// (No changes needed here, assuming it's in a separate file or at the top)
const BackgroundSlideshow = () => { /* ... */ };

// --- Main Register Component ---
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", role: "User" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- Logic for the custom dropdown ---
  const handleRoleSelect = (role) => {
    setForm((prev) => ({ ...prev, role }));
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const exists = users.some(
      (user) => user.username.trim().toLowerCase() === form.username.trim().toLowerCase()
    );

    if (exists) {
      setError("Username already exists. Please choose another.");
      return;
    }

    const newUser = { username: form.username.trim(), password: form.password, role: form.role };
    localStorage.setItem("registeredUsers", JSON.stringify([...users, newUser]));

    setSuccess(true);
    setTimeout(() => navigate("/login?registered=true"), 2000);
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
                    <UserPlus className="w-8 h-8 text-cyan-300"/> Create Your Account
                </motion.h2>

                <AnimatePresence>
                    {error && (
                        <motion.div initial={{opacity: 0, height: 0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height: 0}} className="mb-4 text-center text-red-300 bg-red-500/20 p-3 rounded-lg flex items-center gap-2 justify-center border border-red-500/30">
                            <AlertCircle size={18}/> {error}
                        </motion.div>
                    )}
                     {success && (
                        <motion.div initial={{opacity: 0, height: 0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height: 0}} className="mb-4 text-center text-green-300 bg-green-500/20 p-3 rounded-lg flex items-center gap-2 justify-center border border-green-500/30">
                            <CheckCircle size={18}/> Success! Redirecting to login...
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Input */}
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20}/>
                        <input type="text" name="username" required value={form.username} onChange={handleChange} placeholder="Username"
                            className="w-full p-4 pl-12 rounded-full bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition" />
                    </div>
                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20}/>
                        <input type="password" name="password" required value={form.password} onChange={handleChange} placeholder="Password"
                            className="w-full p-4 pl-12 rounded-full bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition" />
                    </div>

                    {/* ✅ NEW CUSTOM ROLE SELECTOR */}
                    <div className="relative" ref={dropdownRef}>
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20}/>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full p-4 pl-12 rounded-full bg-white/10 text-white text-left border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition flex justify-between items-center"
                        >
                            {form.role}
                            <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                                <ChevronDown size={20} />
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute mt-2 w-full bg-black/50 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 overflow-hidden z-10"
                                >
                                    {["User", "Admin"].map(role => (
                                        <li key={role}
                                            onClick={() => handleRoleSelect(role)}
                                            className="px-4 py-3 text-white/80 hover:bg-cyan-500/20 cursor-pointer transition-colors"
                                        >
                                            {role}
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-white py-3 rounded-full font-bold hover:bg-cyan-600 shadow-lg hover:shadow-cyan-500/40 transition-all text-lg"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-8 text-center text-white/70">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-cyan-300 hover:text-cyan-200 hover:underline">
                        Login here
                    </Link>
                </p>
            </motion.div>
        </div>
    </div>
  );
}