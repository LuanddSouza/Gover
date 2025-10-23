import { UsersIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";

export default function Card() {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl shadow-md bg-[var(--background)] text-[var(--foreground)] border border-gray-200 dark:border-gray-700 w-80 h-30 transition-colors duration-300">
      {/* Conteúdo à esquerda */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-500 dark:text-gray-400">Total do Mês</p>
        <h2 className="text-2xl font-bold mt-1">R$ 3.500,00</h2>

        <div className="flex items-center gap-1 mt-2">
          <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-500 font-medium">8.5%</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Lucro Anual</span>
        </div>
      </div>

      {/* Ícone à direita */}
      <div className="w-12 h-12 rounded-xl bg-indigo-800 flex items-center justify-center">
        <UsersIcon className="h-6 w-6 text-indigo-300" />
      </div>
    </div>
  );
}
