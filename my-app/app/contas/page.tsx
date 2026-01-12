"use client";

import { useState } from "react";
import {
  Plus,
  Building2,
  CreditCard,
  Wallet,
} from "lucide-react";

type AccountType = "checking" | "savings" | "credit" | "cash";

type Account = {
  id: string;
  name: string;
  institution: string;
  type: AccountType;
};

const accountTypeLabel: Record<AccountType, string> = {
  checking: "Conta Corrente",
  savings: "Poupança",
  credit: "Cartão de Crédito",
  cash: "Dinheiro",
};

const accountTypeIcon: Record<AccountType, any> = {
  checking: Building2,
  savings: Building2,
  credit: CreditCard,
  cash: Wallet,
};

/**
 * Gerador de ID compatível com qualquer ambiente
 * (ID temporário até ter backend)
 */
function generateId() {
  return Date.now().toString() + Math.random().toString(36).slice(2);
}

export default function ContasPage() {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      name: "Banco Inter",
      institution: "inter",
      type: "checking",
    },
    {
      id: "2",
      name: "Nubank",
      institution: "nubank",
      type: "credit",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    institution: "",
    type: "checking" as AccountType,
  });

  function handleCreateAccount() {
    if (!form.name || !form.institution) return;

    setAccounts((prev) => [
      ...prev,
      {
        id: generateId(),
        name: form.name,
        institution: form.institution,
        type: form.type,
      },
    ]);

    setForm({ name: "", institution: "", type: "checking" });
    setIsOpen(false);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contas</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[var(--azul-gover)] text-white px-4 py-2 rounded-md hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Adicionar conta
        </button>
      </div>

      {/* Lista de contas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => {
          const Icon = accountTypeIcon[account.type];

          return (
            <div
              key={account.id}
              className="border border-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-gray-800 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-[var(--azul-gover)]" />

                <div>
                  <p className="font-medium">{account.name}</p>
                  <span className="text-sm text-gray-400">
                    {accountTypeLabel[account.type]}
                  </span>
                </div>
              </div>

              <span className="text-xs text-gray-500 uppercase">
                {account.institution}
              </span>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[var(--background)] w-full max-w-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              Nova conta
            </h2>

            <div className="flex flex-col gap-4">
              {/* Instituição */}
              <div>
                <label className="text-sm text-gray-400">
                  Instituição
                </label>
                <select
                  className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700"
                  value={form.institution}
                  onChange={(e) =>
                    setForm({ ...form, institution: e.target.value })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="inter">Banco Inter</option>
                  <option value="nubank">Nubank</option>
                  <option value="bb">Banco do Brasil</option>
                  <option value="itau">Itaú</option>
                  <option value="caixa">Caixa</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              {/* Tipo */}
              <div>
                <label className="text-sm text-gray-400">
                  Tipo da conta
                </label>
                <select
                  className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700"
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value as AccountType,
                    })
                  }
                >
                  <option value="checking">Conta Corrente</option>
                  <option value="savings">Poupança</option>
                  <option value="credit">Cartão de Crédito</option>
                  <option value="cash">Dinheiro</option>
                </select>
              </div>

              {/* Nome */}
              <div>
                <label className="text-sm text-gray-400">
                  Nome da conta
                </label>
                <input
                  type="text"
                  placeholder="Ex: Inter PJ, Nubank Roxinho"
                  className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateAccount}
                className="px-4 py-2 bg-[var(--azul-gover)] text-white rounded hover:opacity-90"
              >
                Criar conta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
