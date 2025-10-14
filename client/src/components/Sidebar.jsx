// Sidebar.jsx
import { Link } from "react-router-dom";
import { Home, Truck, Building2, Settings, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const navItems = [
    { to: "/home", label: "Dashboard", Icon: Home },
    { to: "/home/shipment", label: "Shipments", Icon: Truck },
    { to: "/home/warehouse", label: "Warehouse", Icon: Building2 },
    { to: "/home/users", label: "Users", Icon: Settings },
  ];

  return (
    // NOTE: For the sidebar to stretch only until the footer, place this Sidebar inside
    // a layout where the overall page is `min-h-screen flex flex-col` and the
    // main area is `flex-1 flex` — example layout file is provided below.
    <aside
      className={`flex flex-col bg-[#FFF1F1] text-[#6F00FF] transition-all duration-300 shadow-sm select-none
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Collapse Button (top-right when expanded, centered when collapsed) */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-end'} p-3`}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-[#6F00FF]/10"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation area fills remaining space */}
        <nav className="flex-1 px-2 py-4">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all
                    ${collapsed ? 'justify-center' : 'justify-start'}
                    hover:bg-[#6F00FF]/70 hover:text-white`
                  }
                >
                  {/* Icon container with fixed size so icon never scales */}
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
                    <item.Icon className="w-5 h-5" />
                  </div>

                  {/* Label hidden when collapsed */}
                  {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}


