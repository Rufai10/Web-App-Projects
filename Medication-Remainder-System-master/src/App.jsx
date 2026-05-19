import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// --- Import All Page Components ---
import Login from './pages/pages/login';
import Register from './pages/pages/register';
import AdminDashboard from './pages/pages/AdminDashboard';
import UserDashboard from './pages/pages/UserDashboard';
import MedicationList from './pages/pages/MedicationList';
import AddMedication from './pages/pages/AddMedication';
import EditMedication from './pages/pages/EditMedication';
import Notifications from './pages/pages/Notifications';
import Calendar from './pages/pages/MedicationCalendar';
import Reports from './pages/pages/Reports';
import ManageMedication from './pages/pages/ManageMedication';
// Assuming you have these pages from previous steps
import SystemSettings from './pages/pages/SystemSettings';
import ManageUsers from './pages/pages/ManageUsers';


// --- Reusable Protected Route Component ---
const ProtectedRoute = ({ isAllowed, redirectPath = '/login', children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};


// --- Reusable Page Animation Wrapper ---
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);


// --- Main App Component ---
export default function App() {
  const location = useLocation();
  const [role, setRole] = useState(sessionStorage.getItem('authRole'));
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));

  // This effect ensures the app state is in sync with session storage
  useEffect(() => {
    setToken(sessionStorage.getItem('authToken'));
    setRole(sessionStorage.getItem('authRole'));
  }, [location]);

  const isLoggedIn = !!token;
  const isAdmin = isLoggedIn && role === 'admin';

  return (
    // AnimatePresence enables animations on route changes
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* === Public Routes === */}
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />

        {/* === Protected Routes === */}
        
        {/* --- Dashboards --- */}
        <Route path="/admin-dashboard" element={ <ProtectedRoute isAllowed={isAdmin}><PageWrapper><AdminDashboard /></PageWrapper></ProtectedRoute> } />
        <Route path="/user-dashboard" element={ <ProtectedRoute isAllowed={isLoggedIn}><PageWrapper><UserDashboard /></PageWrapper></ProtectedRoute> } />
        
        {/* --- Admin-Only Routes --- */}
        <Route path="/add-medication" element={ <ProtectedRoute isAllowed={isAdmin}><PageWrapper><AddMedication /></PageWrapper></ProtectedRoute> } />
        <Route path="/manage-medications" element={ <ProtectedRoute isAllowed={isAdmin}><PageWrapper><ManageMedication /></PageWrapper></ProtectedRoute> } />
        <Route path="/edit-medication/:id" element={ <ProtectedRoute isAllowed={isAdmin}><PageWrapper><EditMedication /></PageWrapper></ProtectedRoute> } />
        <Route path="/admin/settings" element={ <ProtectedRoute isAllowed={isAdmin}><PageWrapper><SystemSettings /></PageWrapper></ProtectedRoute> } />
        <Route path="/admin/manage-users" element={ <ProtectedRoute isAllowed={isAdmin}><PageWrapper><ManageUsers /></PageWrapper></ProtectedRoute> } />
        
        {/* --- Shared Logged-in User Routes --- */}
        <Route path="/medications" element={ <ProtectedRoute isAllowed={isLoggedIn}><PageWrapper><MedicationList /></PageWrapper></ProtectedRoute> } />
        <Route path="/notifications" element={ <ProtectedRoute isAllowed={isLoggedIn}><PageWrapper><Notifications /></PageWrapper></ProtectedRoute> } />
        <Route path="/calendar" element={ <ProtectedRoute isAllowed={isLoggedIn}><PageWrapper><Calendar /></PageWrapper></ProtectedRoute> } />
        <Route path="/reports" element={ <ProtectedRoute isAllowed={isLoggedIn}><PageWrapper><Reports /></PageWrapper></ProtectedRoute> } />
        
        {/* === Fallback and Root Redirects === */}

        {/* Redirect from root based on role */}
        <Route path="/" element={
            <Navigate 
                to={!isLoggedIn ? '/login' : (isAdmin ? '/admin-dashboard' : '/user-dashboard')} 
                replace 
            />} 
        />
        
        {/* Catch-all route for any other path, including the old "/dashboard" */}
        <Route path="*" element={
            <Navigate 
                to={!isLoggedIn ? '/login' : (isAdmin ? '/admin-dashboard' : '/user-dashboard')} 
                replace 
            />} 
        />
        
      </Routes>
    </AnimatePresence>
  );
}