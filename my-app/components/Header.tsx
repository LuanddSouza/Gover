import TemaControle from "./controle-tema";
import { UserIcon } from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Lado esquerdo */}
      <h1 className="text-xl font-bold">
         {/* Botão de tema */}
        <TemaControle />
      </h1>

      {/* Lado direito */}
      <div className="flex items-center gap-4 pr-8">
        {/* Saudação + ícone de usuário */}
        <div className="flex items-center gap-2 pl-8">
          <UserIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          <span className="font-medium">Olá, Luan!</span>
        </div>
      </div>
    </header>
  );
}
