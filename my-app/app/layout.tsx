import Sidebar from "./components/Sidebar";
import "./globals.css";

export const metadata = {
  title: "GranaFlow",
  description: "Gestão Financeira Inteligente",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="flex">
        <Sidebar />
        <main className="flex-1 bg-gray-100 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
