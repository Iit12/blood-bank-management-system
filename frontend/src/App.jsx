import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Donors from './pages/Donors';
import Inventory from './pages/Inventory';
import Requests from './pages/Requests';
import Issuance from './pages/Issuance';
import Reports from './pages/Reports';        // ← Add this line

const ProtectedLayout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="flex items-center justify-center min-h-screen text-2xl">Loading...</div>;
  
  return user ? (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
        {children}
      </div>
    </div>
  ) : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
          <Route path="/donors" element={<ProtectedLayout><Donors /></ProtectedLayout>} />
          <Route path="/inventory" element={<ProtectedLayout><Inventory /></ProtectedLayout>} />
          <Route path="/requests" element={<ProtectedLayout><Requests /></ProtectedLayout>} />
          <Route path="/issuance" element={<ProtectedLayout><Issuance /></ProtectedLayout>} />
          <Route path="/reports" element={<ProtectedLayout><Reports /></ProtectedLayout>} />   {/* ← This line */}

          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;