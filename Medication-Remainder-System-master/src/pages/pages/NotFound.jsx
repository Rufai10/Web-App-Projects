import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-extrabold text-red-600 mb-6">404</h1>
        <p className="text-lg mb-8 text-gray-700">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          🔙 Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
