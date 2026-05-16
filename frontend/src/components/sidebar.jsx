import { Link, useLocation } from "react-router-dom";
import { LogOut, Users, Droplet, ClipboardList, Truck, BarChart3 } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: BarChart3, label: "Dashboard" },
    { path: "/donors", icon: Users, label: "Donors" },
    { path: "/inventory", icon: Droplet, label: "Inventory" },
    { path: "/requests", icon: ClipboardList, label: "Requests" },
    { path: "/issuance", icon: Truck, label: "Blood Issuance" },
    { path: "/reports", icon: BarChart3, label: "Reports" },
  ];

  return (
    <div className="w-64 bg-zinc-900 h-screen fixed flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-red-500">BBMS</h1>
        <p className="text-zinc-400 text-sm">Blood Bank</p>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                isActive 
                  ? "bg-red-500 text-white" 
                  : "hover:bg-zinc-800 text-zinc-300"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-zinc-800 rounded-xl"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;