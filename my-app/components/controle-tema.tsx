"use client";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function TemaControle() {
  const [tema, setTema] = useState("light");

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo) {
      setTema(temaSalvo);
      document.documentElement.classList.toggle("dark", temaSalvo === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tema", tema);
    document.documentElement.classList.toggle("dark", tema === "dark");
  }, [tema]);

  const alternarTema = () => {
    setTema((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={alternarTema}
      className="p-2 rounded-md transition"
      title={tema === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
    >
      {tema === "light" ? (
        <MoonIcon className="h-8 w-8 text-gray-700" />
      ) : (
        <SunIcon className="h-8 w-8 text-yellow-400" />
      )}
    </button>
  );
}
