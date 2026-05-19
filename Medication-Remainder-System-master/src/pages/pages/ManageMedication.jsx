import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Edit, Trash2, PlusCircle, Pill, ArrowLeftCircle } from "lucide-react";

const ManageMedication = () => {
  const [medications, setMedications] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("medications")) || [];
    setMedications(stored);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this medication?")) return;
    const updated = medications.filter((med) => med.id !== id);
    setMedications(updated);
    localStorage.setItem("medications", JSON.stringify(updated));
  };

  const filtered = medications.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white p-6 font-[Poppins]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Medications</h1>
          <Link to="/add-medication">
            <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2 rounded-full">
              <PlusCircle size={18} /> Add New
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search medications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 pl-10 pr-4 py-2 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((med) => (
            <div
              key={med.id}
              className="bg-slate-800 p-6 rounded-3xl shadow-lg border border-white/10 flex flex-col items-center"
            >
              <div className="bg-cyan-600 p-4 rounded-full mb-4">
                <Pill size={36} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-center">{med.name}</h2>
              <p className="text-cyan-300 font-medium text-center">{med.dosage}</p>
              <p className="text-sm text-gray-400 text-center">{med.frequency}</p>
              <p className="text-sm text-gray-500 text-center mt-2">
                {med.startDate} - {med.endDate}
              </p>

              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => navigate(`/edit-medication/${med.id}`)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 rounded-full hover:bg-blue-700"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(med.id)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 rounded-full hover:bg-red-700"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 mt-16">No medications found.</p>
        )}

        {/* Back Button */}
        <div className="mt-10 text-center">
          <Link
            to="/admin-dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all"
          >
            <ArrowLeftCircle size={20} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageMedication;
