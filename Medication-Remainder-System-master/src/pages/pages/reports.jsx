import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowLeftCircle, Search, FileDown, Printer, BarChart3 } from "lucide-react";

// --- Reusable Animated Background Component ---
const backgroundImages = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1950&q=80",
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


// --- Main Reports Component ---
export default function Reports() {
  const [medications, setMedications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("medications")) || [];
    setMedications(stored);
  }, []);

  const filteredMedications = medications.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dosageData = filteredMedications.reduce((acc, med) => {
    const dosage = med.dosage || "N/A";
    const existing = acc.find(item => item.name === dosage);
    if (existing) { existing.value += 1; } else { acc.push({ name: dosage, value: 1 }); }
    return acc;
  }, []);

  const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'];

  const handlePDFExport = () => {
    const doc = new jsPDF();
    const tableData = filteredMedications.map(m => [m.name, m.dosage, m.frequency, m.startDate, m.endDate]);

    doc.setFont("helvetica", "bold");
    doc.text("Medication Analysis Report", 14, 22);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

    autoTable(doc, {
      startY: 35,
      head: [['Name', 'Dosage', 'Frequency', 'Start Date', 'End Date']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [22, 34, 57], textColor: [255, 255, 255] },
      styles: { font: 'helvetica', fontSize: 9 },
    });

    doc.save("MedTrack_Report.pdf");
  };

  return (
    <div className="min-h-screen w-full font-[Poppins]">
      <BackgroundSlideshow />
      <div className="fixed inset-0 z-20 grid place-items-center overflow-y-auto p-4 md:p-6">
        <div className="absolute inset-0 bg-black/60 -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-7xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20"
        >
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3"><BarChart3/> Reports Dashboard</h2>
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-12 rounded-full bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                placeholder="Filter medications..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-black/20 p-8 rounded-2xl shadow-inner border border-white/10">
              <h3 className="text-xl font-semibold text-white/90 mb-4">Medication Details</h3>
              <div className="overflow-x-auto max-h-[60vh] custom-scrollbar">
                <table className="min-w-full text-sm text-white/80">
                  <thead className="sticky top-0 bg-black/30 backdrop-blur-sm">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Name</th>
                      <th className="px-4 py-3 text-left font-semibold">Dosage</th>
                      <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Frequency</th>
                      <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Start Date</th>
                      <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">End Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredMedications.length > 0 ? filteredMedications.map((med) => (
                      <tr key={med.id} className="hover:bg-white/10 transition-colors">
                        <td className="px-4 py-3 font-medium text-cyan-300">{med.name}</td>
                        <td className="px-4 py-3">{med.dosage}</td>
                        <td className="px-4 py-3 hidden md:table-cell">{med.frequency}</td>
                        <td className="px-4 py-3 hidden lg:table-cell">{med.startDate}</td>
                        <td className="px-4 py-3 hidden lg:table-cell">{med.endDate}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan="5" className="text-center py-16 text-white/70">No medications match your filter.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-black/20 p-8 rounded-2xl shadow-inner border border-white/10">
                <h3 className="text-xl font-semibold text-white/90 mb-4">Medication Frequency</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={filteredMedications} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fill: 'rgba(255,255,255,0.7)' }}/>
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.1)'}} contentStyle={{ backgroundColor: 'rgba(20, 20, 40, 0.8)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '0.5rem' }} labelStyle={{color: '#fff'}} itemStyle={{color: '#ddd'}}/>
                    <Bar dataKey="frequency" fill="rgba(6, 182, 212, 0.7)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-black/20 p-8 rounded-2xl shadow-inner border border-white/10">
                <h3 className="text-xl font-semibold text-white/90 mb-4">Dosage Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={dosageData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}>
                      {dosageData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(20, 20, 40, 0.8)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '0.5rem' }} labelStyle={{color: '#fff'}} itemStyle={{color: '#ddd'}}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={sessionStorage.getItem("isAdmin") === "true" ? "/admin-dashboard" : "/user-dashboard"}
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-white/20 hover:text-white transition-all"
              >
                <ArrowLeftCircle size={20} /> Back to Dashboard
              </Link>
            </motion.div>
            <div className="flex gap-4">
              <motion.button onClick={handlePDFExport} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-5 py-3 rounded-full bg-green-500/80 text-white hover:bg-green-600 shadow-md transition-all">
                <FileDown size={18} /> Export PDF
              </motion.button>
              <motion.button onClick={() => window.print()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-500/80 text-white hover:bg-gray-600 shadow-md transition-all">
                <Printer size={18} /> Print Page
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
