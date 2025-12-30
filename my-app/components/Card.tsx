import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  value: string;
  percentage: string;
  icon: ReactNode;
}

export default function Card({ title, value, percentage, icon }: CardProps) {
  return (
    <div
      className="
        flex items-center justify-between
        p-5 rounded-2xl
        bg-[var(--background)]
        text-[var(--foreground)]
        border border-gray-200 dark:border-gray-700
        w-80 h-30
        shadow-md
        transition-all duration-300 ease-out
        hover:scale-[1.03]
        hover:shadow-xl
      "
    >
      {/* Conteúdo à esquerda */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {title}
        </p>

        <h2 className="text-2xl font-bold mt-1">
          {value}
        </h2>

        <div className="flex items-center gap-1 mt-2">
          <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-500 font-medium">
            {percentage}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Lucro Anual
          </span>
        </div>
      </div>

      {/* Ícone à direita */}
      <div className="w-12 h-12 rounded-xl bg-[var(--azul-gover)] flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}
