import { Link } from "react-router-dom";
import { Home, Package, Truck, Settings, Building2 } from "lucide-react"; // icon set

export default function Sidebar() {
  const navItems = [
    { to: "/", label: "Dashboard", icon: <Home size={20} /> },
    { to: "/shipment", label: "Shipments", icon: <Truck size={20} /> },
    // { to: "/inventory", label: "Inventory", icon: <Package size={20} /> },
    { to: "/warehouse", label: "Warehouse", icon: <Building2 size={20} /> },
    { to: "/users", label: "Users", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="h-screen w-64 bg-[#FFF1F1] text-white flex flex-col p-4">
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 px-3 py-2 rounded-xl transition text-[#6F00FF] hover:bg-[#6F00FF]/70 hover:text-white"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
