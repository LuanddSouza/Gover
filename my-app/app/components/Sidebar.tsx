"use client";

import { useState } from "react";
import Link from "next/link";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", href: "/" },
    { name: "Contas", href: "/contas" },
    { name: "Análises", href: "/analises" },
    { name: "Gerar Relatórios", href: "/relatorios" },
    { name: "Ver Planos", href: "/planos" },
  ];

  return (
    <div className="flex flex-col justify-between h-screen w-56 bg-[#2d2929] text-white">
      {/* Logo */}
      <div className="p-4">
        <h1 className="text-xl font-bold">
          Grana<span className="text-blue-500">Flow</span>
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 px-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setActive(item.name)}
            className={`px-3 py-2 rounded-md text-sm transition ${
              active === item.name
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 flex justify-center">
        <Cog6ToothIcon className="h-6 w-6 text-gray-400 hover:text-gray-200 cursor-pointer" />
      </div>
    </div>
  );
}
