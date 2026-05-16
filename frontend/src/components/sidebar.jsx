import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Users, Droplet, Hospital, BarChart3, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

 const menuItems = [
  { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <Users size={20} />, label: 'Donors', path: '/donors' },
  { icon: <Droplet size={20} />, label: 'Blood Inventory', path: '/inventory' },
  { icon: <Hospital size={20} />, label: 'Hospital Requests', path: '/requests' },
  { icon: <Droplet size={20} />, label: 'Blood Issuance', path: '/issuance' },
  { icon: <BarChart3 size={20} />, label: 'Reports', path: '/reports' },
];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0 flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-red-500 tracking-tight">BBMS</h1>
        <p className="text-xs text-gray-400 mt-1">Blood Bank Management System</p>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-800">
        <p className="text-sm text-gray-400">Logged in as</p>
        <p className="font-semibold text-lg">{user?.name}</p>
        <p className="text-xs text-red-400 capitalize">{user?.role}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all ${
              location.pathname === item.path 
                ? 'bg-red-600 text-white' 
                : 'hover:bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800 mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-5 py-3.5 text-red-400 hover:bg-red-950/50 rounded-2xl transition"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;