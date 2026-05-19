import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem('authRole');
  const username = localStorage.getItem('authUser') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authRole');
    localStorage.removeItem('authUser');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h4 className="text-white text-center text-2xl font-bold mb-6">💊 Md.Reminder</h4>
        <nav className="flex flex-col gap-2">
          {role === 'admin' && (
            <>
              <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">🏠 Dashboard</Link>
              <Link to="/add-medication" className="hover:bg-gray-700 p-2 rounded">➕ Add Medication</Link>
            </>
          )}

          <Link to="/medications" className="hover:bg-gray-700 p-2 rounded">📋 View Medications</Link>
          <Link to="/calendar" className="hover:bg-gray-700 p-2 rounded">📆 Calendar</Link>
          <Link to="/notifications" className="hover:bg-gray-700 p-2 rounded">🔔 Notifications</Link>
          <Link to="/reports" className="hover:bg-gray-700 p-2 rounded">📄 Reports</Link>
        </nav>

        {role === 'user' && (
          <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search Medications"
              className="w-full p-2 mb-2 rounded text-black"
              required
            />
            <button
              type="submit"
              className="w-full bg-white text-gray-800 py-2 rounded hover:bg-gray-200"
            >
              Search
            </button>
          </form>
        )}

        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="block w-full text-center bg-red-600 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-2">Welcome, {username}!</h2>
        <p className="text-gray-600 mb-6">Manage your medications easily with the buttons below.</p>

        <div className="flex flex-wrap gap-4">
          {role === 'admin' && (
            <>
              <Link to="/add-medication" className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700">
                ➕ Add Medication
              </Link>
              <Link to="/medications" className="bg-gray-600 text-white px-5 py-3 rounded hover:bg-gray-700">
                📋 View Medications
              </Link>
              <Link to="/calendar" className="bg-cyan-600 text-white px-5 py-3 rounded hover:bg-cyan-700">
                📆 Calendar
              </Link>
              <Link to="/notifications" className="bg-yellow-500 text-white px-5 py-3 rounded hover:bg-yellow-600">
                🔔 Notifications
              </Link>
              <Link to="/reports" className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700">
                📄 Reports
              </Link>
            </>
          )}

          {role === 'user' && (
            <>
              <Link to="/medications" className="bg-gray-600 text-white px-5 py-3 rounded hover:bg-gray-700">
                📋 View Medications
              </Link>
              <Link to="/calendar" className="bg-cyan-600 text-white px-5 py-3 rounded hover:bg-cyan-700">
                📆 Calendar
              </Link>
              <Link to="/notifications" className="bg-yellow-500 text-white px-5 py-3 rounded hover:bg-yellow-600">
                🔔 Notifications
              </Link>
              <Link to="/reports" className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700">
                📄 Reports
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
