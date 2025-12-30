"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { UsersIcon, TrashIcon } from "@heroicons/react/24/solid";
import dados from "@/api/dados.json";

// dados para tabela
const initialData = dados;

export default function Home() {


  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5; // quandidade de itens por página

  /* ======================
     Paginação
     ====================== */
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  function handleDelete(id: number) {
    setData((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <main className="bg-[var(--background2)] min-h-screen transition">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <Card
            title="Total do Mês"
            value="R$ 3.500,00"
            percentage="8.5%"
            icon={<UsersIcon className="h-6 w-6 text-indigo-100" />}
          />
          <Card
            title="Despesas do Mês"
            value="R$ 2.500,00"
            percentage="8.5%"
            icon={<UsersIcon className="h-6 w-6 text-indigo-100" />}
          />
          <Card
            title="Lucro do Mês"
            value="R$ 500,00"
            percentage="8.5%"
            icon={<UsersIcon className="h-6 w-6 text-indigo-100" />}
          />
        </section>

        {/* Tabela */}
        <section className="bg-neutral-primary-soft rounded-2xl border border-default shadow-sm m-4">
          <div className="px-6 py-4 border-b border-default">
            <h2 className="text-lg font-semibold text-heading">
              Últimos Registros
            </h2>
            <p className="text-sm text-body">
              Movimentações financeiras
            </p>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-body">
              <thead className="bg-neutral-secondary-medium border-b border-default-medium">
                <tr>
                  <th className="px-6 py-4 font-semibold text-sm">Descrição</th>
                  <th className="px-6 py-4 font-semibold text-sm">Tipo</th>
                  <th className="px-6 py-4 font-semibold text-sm">Categoria</th>
                  <th className="px-6 py-4 font-semibold text-sm text-right">Valor</th>
                  <th className="px-6 py-4 font-semibold text-sm text-center">Ações</th>
                </tr>
              </thead>


              <tbody className="divide-y divide-default">
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="
                      group
                      hover:bg-neutral-secondary-soft
                      transition-all
                    "
                  >
                    <td className="px-6 py-4 font-medium text-heading">
                      {item.desc}
                    </td>

                    {/* Tipo com badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`
                            inline-flex
                            items-center
                            justify-center
                            w-24
                            h-7
                            rounded-full
                            text-xs
                            font-semibold
                            ${item.type === "Entrada"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {item.type}
                      </span>
                    </td>
                    
                    {/* Categoria */}
                    <td className="px-6 py-4 text-body">
                      {item.category}
                    </td>

                    {/* Valor destacado */}
                    <td className="px-6 py-4 text-right font-semibold">
                      {item.value}
                    </td>

                    {/* Ações */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <button
                          className="
                                text-fg-brand
                                hover:text-fg-brand-strong
                                text-sm
                                font-medium
                              "
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="
                              text-red-500
                              hover:text-red-600
                            "
                          title="Excluir"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}

                {paginatedData.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Nenhum registro encontrado
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* Paginação */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-default">
            <span className="text-sm text-body">
              Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
            </span>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="
                  px-4 py-1.5 rounded-lg
                  border border-default
                  text-sm
                  hover:bg-neutral-secondary-soft
                  disabled:opacity-40
                "
              >
                Anterior
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="
                    px-4 py-1.5 rounded-lg
                    border border-default
                    text-sm
                    hover:bg-neutral-secondary-soft
                    disabled:opacity-40
                  "
              >
                Próxima
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
