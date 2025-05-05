import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router";

interface SidebarProps {
  isDrawer?: boolean;
}

export default function Sidebar({ isDrawer = false }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="w-5 h-5 mr-2" />,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";

    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        "border-r",
        isDrawer ? "w-full p-4" : "hidden md:block w-64 p-4"
      )}
    >
      {isDrawer && <div className="font-bold text-xl mb-6">PropManag</div>}

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center p-2 rounded-md",
              isActive(item.path)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            )}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
