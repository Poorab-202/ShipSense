import { Link } from "react-router-dom";
import { Home, Package, Truck, Settings, Building2, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const navItems = [
    { to: "/", label: "Dashboard", icon: <Home size={20} /> },
    { to: "/shipment", label: "Shipments", icon: <Truck size={20} /> },
    { to: "/warehouse", label: "Warehouse", icon: <Building2 size={20} /> },
    { to: "/users", label: "Users", icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className={`h-full bg-[#FFF1F1] text-[#6F00FF] flex flex-col p-4 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 p-2 rounded-lg hover:bg-[#6F00FF]/10 self-end"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 px-3 py-2 rounded-xl transition hover:bg-[#6F00FF]/70 hover:text-white"
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
