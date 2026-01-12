"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
import {
  UsersIcon,
  TrashIcon,
  PlusIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/solid";

/* ======================
   TIPOS
====================== */
type TransactionType = "Entrada" | "Saída";

type Transaction = {
  id: number;
  account: string;
  desc: string;
  type: TransactionType;
  category: string;
  value: number;
};

/* ======================
   MOCKS
====================== */
const accountsMock = [
  "Nubank",
  "Banco Inter",
  "Banco do Brasil",
  "Dinheiro",
];

const initialData: Transaction[] = [
  {
    id: 1,
    account: "Nubank",
    desc: "Almoço",
    type: "Saída",
    category: "Alimentação",
    value: 45,
  },
  {
    id: 2,
    account: "Banco Inter",
    desc: "Salário",
    type: "Entrada",
    category: "Renda",
    value: 5000,
  },
];

export default function Home() {
  const [data, setData] = useState<Transaction[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    account: "",
    desc: "",
    type: "Saída" as TransactionType,
    category: "",
    value: "",
  });

  const ITEMS_PER_PAGE = 10;

  /* ======================
     CORREÇÃO DA PAGINAÇÃO
  ====================== */
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  /* ======================
     CÁLCULOS DOS CARDS
  ====================== */
  const { totalEntradas, totalSaidas, lucro } = useMemo(() => {
    const entradas = data
      .filter((i) => i.type === "Entrada")
      .reduce((acc, i) => acc + i.value, 0);

    const saidas = data
      .filter((i) => i.type === "Saída")
      .reduce((acc, i) => acc + i.value, 0);

    return {
      totalEntradas: entradas,
      totalSaidas: saidas,
      lucro: entradas - saidas,
    };
  }, [data]);

  /* ======================
     PAGINAÇÃO
  ====================== */
  const totalPages = Math.max(
    1,
    Math.ceil(data.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  function handleDelete(id: number) {
    setData((prev) => prev.filter((item) => item.id !== id));
  }

  function handleCreateTransaction() {
    if (
      !form.account ||
      !form.desc ||
      !form.category ||
      !form.value
    )
      return;

    setData((prev) => [
      {
        id: Date.now(),
        account: form.account,
        desc: form.desc,
        type: form.type,
        category: form.category,
        value: Number(form.value),
      },
      ...prev,
    ]);

    setForm({
      account: "",
      desc: "",
      type: "Saída",
      category: "",
      value: "",
    });

    setIsOpen(false);
  }

  /* ======================
     IMPORTAÇÃO OFX (MOCK)
  ====================== */
  function handleImportOFX() {
    const ofxMock: Transaction[] = [
      {
        id: Date.now() + 1,
        account: "Banco do Brasil",
        desc: "Supermercado",
        type: "Saída",
        category: "Mercado",
        value: 320,
      },
      {
        id: Date.now() + 2,
        account: "Banco do Brasil",
        desc: "Transferência Recebida",
        type: "Entrada",
        category: "Renda",
        value: 1200,
      },
    ];

    setData((prev) => [...ofxMock, ...prev]);
  }

  return (
    <main className="bg-[var(--background2)] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Total do Mês"
            value={`R$ ${totalEntradas.toLocaleString("pt-BR")}`}
            percentage=""
            icon={<UsersIcon className="h-6 w-6" />}
          />
          <Card
            title="Despesas do Mês"
            value={`R$ ${totalSaidas.toLocaleString("pt-BR")}`}
            percentage=""
            icon={<UsersIcon className="h-6 w-6" />}
          />
          <Card
            title="Lucro do Mês"
            value={`R$ ${lucro.toLocaleString("pt-BR")}`}
            percentage=""
            icon={<UsersIcon className="h-6 w-6" />}
          />
        </section>

        {/* TABELA */}
        <section className="bg-neutral-primary-soft rounded-2xl border shadow-sm">
          <div className="px-6 py-4 border-b flex justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Últimos Registros
              </h2>
              <p className="text-sm text-gray-400">
                Movimentações financeiras
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleImportOFX}
                className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-neutral-secondary-soft"
              >
                <DocumentArrowUpIcon className="h-4 w-4" />
                Importar OFX
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-[var(--azul-gover)] text-white px-4 py-2 rounded-lg"
              >
                <PlusIcon className="h-4 w-4" />
                Adicionar gasto
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="px-6 py-4 text-left">Conta</th>
                  <th className="px-6 py-4 text-left">Descrição</th>
                  <th className="px-6 py-4 text-left">Tipo</th>
                  <th className="px-6 py-4 text-left">Categoria</th>
                  <th className="px-6 py-4 text-right">Valor</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-neutral-secondary-soft">
                    <td className="px-6 py-4">{item.account}</td>
                    <td className="px-6 py-4">{item.desc}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            item.type === "Entrada"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4 text-right font-semibold">
                      R$ {item.value.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINAÇÃO */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <span className="text-sm">
              Página <strong>{currentPage}</strong> de{" "}
              <strong>{totalPages}</strong>
            </span>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-1.5 border rounded disabled:opacity-40"
              >
                Anterior
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-1.5 border rounded disabled:opacity-40"
              >
                Próxima
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[var(--background)] w-full max-w-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              Adicionar movimentação
            </h2>

            <div className="flex flex-col gap-3">
              <select
                className="p-2 bg-gray-800 border rounded"
                value={form.account}
                onChange={(e) =>
                  setForm({ ...form, account: e.target.value })
                }
              >
                <option value="">Conta</option>
                {accountsMock.map((acc) => (
                  <option key={acc}>{acc}</option>
                ))}
              </select>

              <select
                className="p-2 bg-gray-800 border rounded"
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as TransactionType,
                  })
                }
              >
                <option value="Entrada">Entrada</option>
                <option value="Saída">Saída</option>
              </select>

              <input
                placeholder="Descrição"
                className="p-2 bg-gray-800 border rounded"
                value={form.desc}
                onChange={(e) =>
                  setForm({ ...form, desc: e.target.value })
                }
              />

              <input
                placeholder="Categoria"
                className="p-2 bg-gray-800 border rounded"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              />

              <input
                placeholder="Valor"
                type="number"
                className="p-2 bg-gray-800 border rounded"
                value={form.value}
                onChange={(e) =>
                  setForm({ ...form, value: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsOpen(false)}>Cancelar</button>
              <button
                onClick={handleCreateTransaction}
                className="bg-[var(--azul-gover)] px-4 py-2 rounded text-white"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}