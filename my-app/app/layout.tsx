import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Gover - Gestão Financeira",
  description: "Gestão Financeira Inteligente",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100">
        <Sidebar />

        <main className="ml-56 flex flex-col min-h-screen">
          {/* Header fixo */}
          <Header />
  
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
