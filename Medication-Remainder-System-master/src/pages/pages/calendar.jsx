// Calendar.jsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Link } from 'react-router-dom';

export default function Calendar() {
  // Example events, replace with your dynamic medication reminders
  const events = [
    { title: '💊 Panadol', start: '2025-06-27' },
    { title: '💊 Ibuprofen', start: '2025-07-01' },
    { title: '💊 Vitamin C', start: '2025-07-05' },
  ];

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          📆 Medication Calendar
        </h2>

        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
          eventColor="#2563eb" // Tailwind blue-600
        />

        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="inline-block bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            ⬅️ Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
