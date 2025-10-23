"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Inicio", href: "/" },
    { name: "Dashboard", href: "/" },
    { name: "Contas", href: "/contas" },
    { name: "Análises", href: "/analise" },
    { name: "Gerar Relatórios", href: "/relatorios" },
    { name: "Ver Planos", href: "/planos" },
  ];

  return (
    <main className="flex flex-col justify-between h-screen bg-[var(--background)]">
      <div className="flex flex-col h-screen w-56 text-[var(--foreground)] transition">

        {/* Logo */}
        <div className="flex items-center justify-center pt-6 pb-6">
          {<h1 className="text-3xl font-bold">
            Go<span className="text-blue-500">ver</span>
          </h1>}

          {/* <Image
            src="/Gover.png"   // caminho relativo à pasta /public
            alt="Logo do Gover"
            width={300}
            height={200}
          />  */}

        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActive(item.name)}
              className={`px-3 py-2 rounded-md text-sm transition ${active === item.name
                ? "bg-blue-500 text-white"
                : "text-[var(--text)] hover:bg-gray-700 hover:text-white"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 flex justify-center">
        <Cog6ToothIcon className="h-6 w-6 text-gray-400 hover:text-gray-200 cursor-pointer" />
      </div>
    </main>
  );
}
