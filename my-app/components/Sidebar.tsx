"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Home, BarChart3, FileText, CreditCard, Layers } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Início", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Contas", href: "/contas", icon: CreditCard },
    { name: "Análises", href: "/analise", icon: Layers },
    { name: "Relatórios", href: "/relatorios", icon: FileText },
  ];

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-56 bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between shadow-lg">
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center pt-6 pb-6">
          <h1 className="text-3xl font-bold">
            Go<span className="text-[var(--azul-gover)]">ver</span>
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 px-4">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm transition ${
                  isActive
                    ? "bg-[var(--azul-gover)] text-white"
                    : "text-[var(--text)] hover:bg-gray-500 hover:text-white"
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 flex justify-center">
        <Cog6ToothIcon className="h-6 w-6 text-gray-400 hover:text-gray-200 cursor-pointer" />
      </div>
    </aside>
  );
}
