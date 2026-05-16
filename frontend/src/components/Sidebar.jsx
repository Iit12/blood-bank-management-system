import { Link, useLocation } from "react-router-dom";
import { LogOut, Users, Droplet, ClipboardList, Truck, BarChart3, Home } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/donors", icon: Users, label: "Donors" },
    { path: "/inventory", icon: Droplet, label: "Inventory" },
    { path: "/requests", icon: ClipboardList, label: "Requests" },
    { path: "/issuance", icon: Truck, label: "Blood Issuance" },
    { path: "/reports", icon: BarChart3, label: "Reports" },
  ];

  return (
    <div className="w-64 bg-zinc-900 h-screen fixed flex flex-col border-r border-zinc-800">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
            <Droplet className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">BBMS</h1>
            <p className="text-zinc-400 text-xs">Blood Bank</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-zinc-800 mt-auto">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-zinc-800 rounded-xl text-sm font-medium transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;