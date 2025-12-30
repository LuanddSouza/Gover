import TemaControle from "./controle-tema";
import { UserIcon } from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 shadow-lg">
      {/* Lado esquerdo */}
      <h1 className="text-xl font-bold">
         {/* Botão de tema */}
        <TemaControle />
      </h1>

      {/* Lado direito */}
      <div className="flex items-center gap-4 pr-8">
        {/* Saudação + ícone de usuário */}
        <div className="flex items-center gap-2 pl-8">
          <UserIcon className="h-7 w-7 text-gray dark:text-gray-200 bg-[var(--azul-gover)] rounded-full p-1" />
          <span className="font-medium">Olá, Luan!</span>
        </div>
      </div>
    </header>
  );
}
