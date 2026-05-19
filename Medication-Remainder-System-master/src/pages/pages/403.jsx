import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AccessDenied() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center px-4">
      {loading ? (
        <div className="text-red-700 text-lg">🔄 Loading access status...</div>
      ) : (
        <div className="bg-white border border-red-300 p-8 rounded-lg shadow-lg text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-red-800 mb-2">🚫 403 - Access Denied</h1>
          <p className="text-red-700 mb-6">Sorry! You do not have permission to access this page.</p>
          <Link
            to="/dashboard"
            className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            🏠 Back to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
